import { afterEach, beforeEach, expect, test } from 'bun:test';
import { mkdtemp, mkdir, readFile, writeFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { copyAtomic, withBuildLock } from '../src/cli/build-io';

let root: string;
beforeEach(async () => { root = await mkdtemp(join(tmpdir(), 'kit-build-integrity-')); });
afterEach(async () => { await rm(root, { recursive: true, force: true }); });

function cli(args: string[]) {
    return Bun.spawn([process.execPath, resolve(import.meta.dir, '../bin/cli.ts'), ...args], {
        cwd: root, stdout: 'pipe', stderr: 'pipe',
    });
}
async function resourceInput() {
    const input = join(root, 'src/resources');
    await mkdir(input, { recursive: true });
    const expected = new Map<string, Buffer>();
    for (let index = 0; index < 9; index++) {
        const name = `screen-${index}.vyint`;
        const bytes = Buffer.from(JSON.stringify({ width: 640, height: 360, elements: [], label: 'x'.repeat(index * 700) }));
        await writeFile(join(input, name), bytes); expected.set(name, bytes);
    }
    for (let index = 0; index < 32; index++) {
        const name = `sound-${index}.wav`, bytes = Buffer.alloc(32768 + index * 211, index + 1);
        await writeFile(join(input, name), bytes); expected.set(name, bytes);
    }
    await writeFile(join(input, 'atlas.vyi'), JSON.stringify({ v: 1, i: [] }));
    expected.set('atlas.vyi', Buffer.from(JSON.stringify({ v: 1, i: [] })));
    return expected;
}
async function assertResources(output: string, expected: Map<string, Buffer>) {
    const manifest = JSON.parse(await readFile(join(root, 'resource.json'), 'utf8'));
    let count = 0;
    for (const entries of Object.values(manifest) as any[][]) for (const entry of entries) {
        const data = await readFile(join(output, 'resources', entry.resourceIdentifier));
        expect(data.equals(expected.get(entry.fileName)!)).toBe(true);
        if (entry.fileName.endsWith('.vyint')) expect(JSON.parse(data.toString()).elements).toEqual([]);
        count++;
    }
    expect(count).toBe(expected.size);
}

test('repeated complete CLI builds preserve every resource byte under allocation pressure', async () => {
    const expected = await resourceInput();
    for (let iteration = 0; iteration < 12; iteration++) {
        const process = cli(['build', '--no-app']);
        const [exit, stdout, stderr] = await Promise.all([process.exited,
            new Response(process.stdout).text(), new Response(process.stderr).text()]);
        expect(exit, stdout + stderr).toBe(0);
        await assertResources(join(root, 'dist'), expected);
    }
}, 20000);

test('bad interface JSON exits unsuccessfully and keeps the previous live output and manifest', async () => {
    await resourceInput();
    await mkdir(join(root, 'dist'), { recursive: true });
    await writeFile(join(root, 'dist/live.txt'), 'previous complete build');
    await writeFile(join(root, 'resource.json'), '{"previous":true}');
    await writeFile(join(root, 'src/resources/screen-0.vyint'), '\0{"elements":[]}');
    const process = cli(['build', '--no-app']);
    const [exit, stderr] = await Promise.all([process.exited, new Response(process.stderr).text()]);
    expect(exit).not.toBe(0);
    expect(stderr).toContain('Invalid interface JSON');
    expect(await readFile(join(root, 'dist/live.txt'), 'utf8')).toBe('previous complete build');
    expect(JSON.parse(await readFile(join(root, 'resource.json'), 'utf8'))).toEqual({ previous: true });
    expect((await readdir(root)).some(name => name.includes('kit-stage') || name.includes('kit-backup') || name === '.kit-build.lock')).toBe(false);
});

test('failed application compilation cannot publish resources or report a successful build', async () => {
    await resourceInput();
    await writeFile(join(root, 'src/index.ts'), 'const broken = ;');
    await mkdir(join(root, 'dist'), { recursive: true });
    await writeFile(join(root, 'dist/index.js'), 'previous bundle');
    const process = cli(['build', '--app']);
    const [exit, stderr] = await Promise.all([process.exited, new Response(process.stderr).text()]);
    expect(exit).not.toBe(0);
    expect(stderr).toContain('Application build failed');
    expect(await readFile(join(root, 'dist/index.js'), 'utf8')).toBe('previous bundle');
});

test('two CLI processes targeting one project cannot mix manifests or erase each other\'s files', async () => {
    const expected = await resourceInput();
    const first = cli(['build', '--no-app']), second = cli(['build', '--no-app']);
    expect(await first.exited).toBe(0); expect(await second.exited).toBe(0);
    await assertResources(join(root, 'dist'), expected);
});

test('locks serialize work and release after a failing build', async () => {
    let active = 0, maxActive = 0;
    const run = () => withBuildLock(root, async () => {
        maxActive = Math.max(maxActive, ++active);
        await new Promise(done => setTimeout(done, 10)); active--;
    });
    await Promise.all([run(), run()]);
    expect(maxActive).toBe(1);
    await expect(withBuildLock(root, async () => { throw new Error('intentional failure'); })).rejects.toThrow('intentional failure');
    await run();
    expect(active).toBe(0);
});

test('invalid source JSON cannot replace a previously valid resource', async () => {
    const source = join(root, 'screen.vyint'), destination = join(root, 'screen.vyr');
    await writeFile(source, '\0{}'); await writeFile(destination, '{"elements":[]}');
    expect(() => copyAtomic(source, destination)).toThrow('Invalid interface JSON');
    expect(JSON.parse(await readFile(destination, 'utf8'))).toEqual({ elements: [] });
});

test('watch mode keeps the previous build after a bad edit and recovers after correction', async () => {
    const expected = await resourceInput();
    const process = cli(['build', '--no-app', '--watch']);
    let logs = '';
    const consume = async (stream: ReadableStream<Uint8Array>) => {
        const reader = stream.getReader(), decoder = new TextDecoder();
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            logs += decoder.decode(value, { stream: true });
        }
    };
    const readers = [consume(process.stdout), consume(process.stderr)];
    const until = async (condition: () => boolean | Promise<boolean>) => {
        const start = Date.now();
        while (!await condition()) {
            if (Date.now() - start > 5000) throw new Error(`Watcher did not settle: ${logs}`);
            await new Promise(done => setTimeout(done, 25));
        }
    };
    try {
        await until(() => logs.includes('Watching for changes'));
        const manifest = await readFile(join(root, 'resource.json'), 'utf8');
        await writeFile(join(root, 'src/resources/screen-0.vyint'), '\0{}');
        await until(() => logs.includes('Build failed; previous output was kept'));
        expect(await readFile(join(root, 'resource.json'), 'utf8')).toBe(manifest);
        await assertResources(join(root, 'dist'), expected);
        const replacement = Buffer.from(JSON.stringify({ width: 320, height: 180, elements: [], recovered: true }));
        expected.set('screen-0.vyint', replacement);
        await writeFile(join(root, 'src/resources/screen-0.vyint'), replacement);
        await until(async () => await readFile(join(root, 'resource.json'), 'utf8') !== manifest);
        // Publishing follows metadata generation. Wait for the resource generation to become live.
        await until(async () => {
            const current = JSON.parse(await readFile(join(root, 'resource.json'), 'utf8'));
            try { return (await readFile(join(root, 'dist/resources', current.interface[0].resourceIdentifier))).equals(replacement); }
            catch { return false; }
        });
        await assertResources(join(root, 'dist'), expected);
    } finally {
        process.kill('SIGINT');
        await process.exited;
        await Promise.all(readers);
    }
}, 15000);

test('duplicate basenames fail explicitly instead of copying two sources to one resource', async () => {
    await resourceInput();
    await mkdir(join(root, 'src/resources/nested'));
    await writeFile(join(root, 'src/resources/nested/screen-0.vyint'), '{"elements":[]}');
    const process = cli(['build', '--no-app']);
    const [exit, stderr] = await Promise.all([process.exited, new Response(process.stderr).text()]);
    expect(exit).not.toBe(0); expect(stderr).toContain('Duplicate resource basename');
});

test('concurrent API invocations keep their options and manifests independent', async () => {
    for (const name of ['a', 'b']) {
        await mkdir(join(root, name));
        await writeFile(join(root, name, 'same.vyint'), JSON.stringify({ elements: [], owner: name }));
    }
    const modulePath = resolve(import.meta.dir, '../src/cli/resource-builder.ts');
    const script = `import {processResources} from ${JSON.stringify(modulePath)};
        await Promise.all(['a','b'].map(name=>processResources({inDirectory:name,outDirectory:name+'-out',manifestPath:name+'-out/manifest.json',app:false})));`;
    const process = Bun.spawn([globalThis.process.execPath, '--eval', script], { cwd: root, stdout: 'pipe', stderr: 'pipe' });
    const [exit, stderr] = await Promise.all([process.exited, new Response(process.stderr).text()]);
    expect(exit, stderr).toBe(0);
    for (const name of ['a', 'b']) {
        const manifest = JSON.parse(await readFile(join(root, name+'-out/manifest.json'), 'utf8'));
        expect(manifest.interface).toHaveLength(1);
        const resource = JSON.parse(await readFile(join(root, name+'-out/resources', manifest.interface[0].resourceIdentifier), 'utf8'));
        expect(resource.owner).toBe(name);
    }
});
