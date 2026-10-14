import { readFileSync, writeFileSync, mkdirSync, renameSync, rmSync } from 'node:fs';
import { promises as fs } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { randomUUID } from 'node:crypto';

/**
 * Keep the snapshot alive through a synchronous write, verify it, then publish
 * with rename. Bun 1.1.43's parallel readFile/writeFile path can corrupt the first
 * eight bytes of a resource; consumers must never see an in-progress file.
 */
export function writeAtomic(path: string, content: string | Uint8Array): void {
    const snapshot = typeof content === 'string' ? Buffer.from(content, 'utf8') : Buffer.from(content);
    mkdirSync(dirname(path), { recursive: true });
    const temporary = join(dirname(path), `.${basename(path)}.${randomUUID()}.tmp`);
    try {
        writeFileSync(temporary, snapshot, { flag: 'wx' });
        if (!readFileSync(temporary).equals(snapshot)) throw new Error(`Write verification failed: ${path}`);
        renameSync(temporary, path);
    } finally {
        rmSync(temporary, { force: true });
    }
}

export function copyAtomic(source: string, destination: string): void {
    const snapshot = readFileSync(source);
    if (source.endsWith('.vyint')) {
        try { JSON.parse(snapshot.toString('utf8')); }
        catch (error) { throw new Error(`Invalid interface JSON: ${source}`, { cause: error }); }
    }
    writeAtomic(destination, snapshot);
}

/** Protect both project metadata and output against another watch/manual build. */
export async function withBuildLock<T>(root: string, build: () => Promise<T>, timeoutMs = 60000): Promise<T> {
    const directory = join(root, '.kit-build.lock');
    const started = Date.now();
    while (true) {
        try {
            mkdirSync(directory);
            writeFileSync(join(directory, 'pid'), String(process.pid));
            break;
        } catch (error: any) {
            if (error.code !== 'EEXIST') throw error;
            const pid = Number(await fs.readFile(join(directory, 'pid'), 'utf8').catch(() => ''));
            if (pid > 0) {
                try { process.kill(pid, 0); }
                catch (error: any) {
                    if (error.code === 'ESRCH') { await fs.rm(directory, { recursive: true, force: true }); continue; }
                }
            }
            if (Date.now() - started >= timeoutMs) throw new Error(`Another Kit build owns ${directory}; output was not changed.`);
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }
    try { return await build(); }
    finally { await fs.rm(directory, { recursive: true, force: true }); }
}

/** A failed compile leaves the previous complete output available. */
export async function publishBuild(staging: string, output: string): Promise<void> {
    const backup = `${output}.kit-backup-${randomUUID()}`;
    let previous = false;
    try { await fs.rename(output, backup); previous = true; }
    catch (error: any) { if (error.code !== 'ENOENT') throw error; }
    try { await fs.rename(staging, output); }
    catch (error) {
        if (previous) await fs.rename(backup, output);
        throw error;
    }
    if (previous) await fs.rm(backup, { recursive: true, force: true }).catch(error => {
        console.warn(`[Kit CLI] Build published, but previous output cleanup failed: ${error}`);
    });
}
