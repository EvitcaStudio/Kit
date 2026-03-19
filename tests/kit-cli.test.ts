import { describe, beforeEach, afterEach, test, expect } from 'bun:test';
import { writeFile, rm, readdir, mkdir, readFile } from 'fs/promises';
import { join } from 'path';
import { KitCLI } from '../src/cli/main';
import { processInit } from '../src/cli/init';

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
        { name: 'file1', extension: 'vyint' },
        { name: 'file2', extension: 'vyi' },
        { name: 'file3', extension: 'vym' },
        { name: 'file4', extension: 'vymac' },
        { name: 'file5', extension: 'mp3' },
        { name: 'file6', extension: 'wav' },
        { name: 'file7', extension: 'm4a' },
        { name: 'file8', extension: 'ogg' },
        { name: 'file9', extension: 'aac' },
        { name: 'file10', extension: 'flac' },
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
        // Robust cleanup of resource.json if it was created in the root
        await rm(join(process.cwd(), 'resource.json'), { force: true });
    });

    test('should process resources with KitCLI', async () => {
        await KitCLI.processResources({
            inDirectory: tempDir,
            outDirectory: outDir,
            ignoreSound: false,
            verbose: false,
        });

        const filesAfterBuild = await readdir(join(outDir, 'resources'), { recursive: true });
        expect(filesAfterBuild.length).toBe(testFiles.length);
    });

    test('should initialize a new project (non-interactive)', async () => {
        const projectName = 'test-project';
        const projectDir = join(process.cwd(), projectName);
        
        // Ensure clean state
        await rm(projectDir, { recursive: true, force: true });

        await processInit({
            projectName,
            single: true,
            verbose: false
        });

        const files = await readdir(projectDir, { recursive: true });
        expect(files.length).toBeGreaterThan(0);
        
        // Check if placeholders were replaced
        const pkgJson = JSON.parse(await readFile(join(projectDir, 'package.json'), 'utf8'));
        expect(pkgJson.name).toBe(projectName);

        // Cleanup
        await rm(projectDir, { recursive: true, force: true });
    });
});
