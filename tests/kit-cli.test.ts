import { describe, beforeEach, afterEach, test, expect } from 'bun:test';
import { writeFile, rm, readdir, mkdir } from 'fs/promises';
import { join } from 'path';
import { KitCLI } from '../bin/kit';

const tempDir = join(process.cwd(), 'tests/temp');
const outDir = join(process.cwd(), 'tests/temp/dist');

async function createFile(pName: string, pExtension: string): Promise<string> {
    const filePath = join(tempDir, `${pName}.${pExtension}`);
    await writeFile(filePath, '');
    return filePath;
}

async function cleanUpDirectory(pDirectory: string): Promise<void> {
    try {
        await rm(pDirectory, { recursive: true, force: true });
    } catch (pError) {
        console.error(`Error cleaning up directory: ${pError}`);
    }
}

async function ensureDirectoryExists(pDirectory: string): Promise<void> {
    try {
        await mkdir(pDirectory, { recursive: true });
    } catch (pError) {
        console.error(`Error creating directory: ${pError}`);
    }
}

describe('Kit CLI', () => {
    const testFiles = [
        { name: 'file1', extension: 'txt' },
        { name: 'file2', extension: 'json' },
        { name: 'file3', extension: 'vyint' },
        { name: 'file4', extension: 'vyi' },
        { name: 'file5', extension: 'vym' },
        { name: 'file6', extension: 'vymac' },
        { name: 'file7', extension: 'mp3' },
        { name: 'file8', extension: 'wav' },
        { name: 'file9', extension: 'm4a' },
        { name: 'file10', extension: 'ogg' },
        { name: 'file11', extension: 'aac' },
        { name: 'file12', extension: 'flac' },
    ];

    beforeEach(async () => {
        await cleanUpDirectory(tempDir);
        await ensureDirectoryExists(tempDir);
        await ensureDirectoryExists(outDir);
        await Promise.all(
            testFiles.map(({ name, extension }) => createFile(name, extension))
        );
    });

    afterEach(async () => {
        await cleanUpDirectory(tempDir);
    });

    test('should process resources with KitCLI', async () => {
        await KitCLI.processResources({
            inDirectory: tempDir,
            outDirectory: outDir,
            ignoreSound: false,
            verbose: true,
        });

        const filesAfterBuild = await readdir(join(outDir, 'resources'));
        const expectedFiles = ['icon', 'interface', 'macros', 'map', 'sound'];

        expectedFiles.forEach((expectedFile) => {
            expect(filesAfterBuild).toContain(expectedFile);
        });
    });
});
