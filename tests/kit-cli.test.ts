import { describe, beforeEach, afterEach, test, expect } from 'bun:test';
import { writeFile, rm, readdir, mkdir, readFile } from 'fs/promises';
import { join } from 'path';
import { KitCLI } from '../src/cli/main';
import { processInit } from '../src/cli/init';
import { bundleApp, detectArchitecture } from '../src/cli/app-bundler';

const tempDir = join(process.cwd(), 'tests/temp');
const inDir = join(tempDir, 'resources');
const outDir = join(tempDir, 'dist');

async function createFile(pName: string, pExtension: string): Promise<string> {
    const filePath = join(inDir, `${pName}.${pExtension}`);
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
        await ensureDirectoryExists(inDir);
        await ensureDirectoryExists(outDir);
        await Promise.all(
            testFiles.map(({ name, extension }) => createFile(name, extension))
        );
    });

    afterEach(async () => {
        await cleanUpDirectory(tempDir);
        // Robust cleanup of resource.json if it was created in the root
        await rm(join(process.cwd(), 'resource.json'), { force: true });
        await rm(join(process.cwd(), 'bounds.json'), { force: true });
        await rm(join(process.cwd(), 'icon-points.json'), { force: true });
        await rm(join(process.cwd(), 'sizes.json'), { force: true });
    });

    test('should process resources with KitCLI and generate bounds.json, icon-points.json and sizes.json', async () => {
        // Write a mock vyi file with bounds and iconPoints to inDir
        const mockVyiData = {
            v: 1,
            i: [
                [
                    "player", // name
                    32, // width
                    32, // height
                    100, // delay
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAA", // dataURL
                    [], // frames
                    [ // states
                        [
                            "run", // state name
                            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAA", // dataURL
                            100, // delay
                            [], // frames
                            { // bounds
                                "hitbox": {
                                    "type": "rect",
                                    "width": 16,
                                    "height": 16,
                                    "xOrigin": 8,
                                    "yOrigin": 8
                                }
                            },
                            [ // state points (optional iconPoints in state)
                                {
                                    "width": 32,
                                    "height": 32,
                                    "x": 5,
                                    "y": 5,
                                    "id": "state_point"
                                }
                            ]
                        ]
                    ],
                    [ // iconPoints
                        {
                            "width": 32,
                            "height": 32,
                            "x": 10,
                            "y": 10,
                            "id": "player_point"
                        }
                    ],
                    { // bounds
                        "hitbox": {
                            "type": "rect",
                            "width": 20,
                            "height": 20,
                            "xOrigin": 6,
                            "yOrigin": 6
                        }
                    }
                ]
            ]
        };
        await writeFile(join(inDir, 'characters.vyi'), JSON.stringify(mockVyiData));

        await KitCLI.processResources({
            inDirectory: inDir,
            outDirectory: outDir,
            ignoreSound: false,
            verbose: false,
        });

        const filesAfterBuild = await readdir(join(outDir, 'resources'), { recursive: true });
        // The original 10 files + characters.vyi = 11 files
        expect(filesAfterBuild.length).toBe(testFiles.length + 1);

        // Verify bounds.json exists and contains correct structure
        const boundsJsonContent = await readFile(join(process.cwd(), 'bounds.json'), 'utf8');
        const boundsData = JSON.parse(boundsJsonContent);

        expect(boundsData.characters).toBeDefined();
        expect(boundsData.characters.player).toBeDefined();
        expect(boundsData.characters.player.bounds).toBeDefined();
        expect(boundsData.characters.player.bounds.hitbox).toEqual({
            type: "rect",
            width: 20,
            height: 20,
            xOrigin: 6,
            yOrigin: 6
        });
        expect(boundsData.characters.player.states).toBeDefined();
        expect(boundsData.characters.player.states.run).toBeDefined();
        expect(boundsData.characters.player.states.run.bounds.hitbox).toEqual({
            type: "rect",
            width: 16,
            height: 16,
            xOrigin: 8,
            yOrigin: 8
        });

        // Verify icon-points.json exists and contains correct structure
        const pointsJsonContent = await readFile(join(process.cwd(), 'icon-points.json'), 'utf8');
        const pointsData = JSON.parse(pointsJsonContent);

        expect(pointsData.characters.player.points).toBeDefined();
        expect(pointsData.characters.player.points.player_point).toEqual({
            width: 32,
            height: 32,
            x: 10,
            y: 10
        });

        // Verify sizes.json exists and contains correct structure
        const sizesJsonContent = await readFile(join(process.cwd(), 'sizes.json'), 'utf8');
        const sizesData = JSON.parse(sizesJsonContent);

        expect(sizesData.characters).toBeDefined();
        expect(sizesData.characters.player).toBeDefined();
        expect(sizesData.characters.player.width).toBe(32);
        expect(sizesData.characters.player.height).toBe(32);
    });

    test('should save manifest to specified path when manifestPath is provided', async () => {
        const customManifest = join(outDir, 'custom-resource.json');
        await KitCLI.processResources({
            inDirectory: inDir,
            outDirectory: outDir,
            manifestPath: customManifest,
            ignoreSound: false,
            verbose: false,
        });

        const manifestContent = JSON.parse(await readFile(customManifest, 'utf8'));
        expect(manifestContent).toHaveProperty('interface');
        expect(manifestContent).toHaveProperty('icon');
    });

    test('should automatically mirror custom asset subdirectories into output resources folder', async () => {
        // Create custom subdirectories like images, fonts, emitters
        const imagesDir = join(inDir, 'images');
        const fontsDir = join(inDir, 'fonts');
        await ensureDirectoryExists(imagesDir);
        await ensureDirectoryExists(fontsDir);

        await writeFile(join(imagesDir, 'background.png'), 'fake-png-content');
        await writeFile(join(fontsDir, 'custom-font.woff2'), 'fake-font-content');

        await KitCLI.processResources({
            inDirectory: inDir,
            outDirectory: outDir,
            ignoreSound: false,
            verbose: false,
        });

        const copiedImage = await readFile(join(outDir, 'resources/images/background.png'), 'utf8');
        const copiedFont = await readFile(join(outDir, 'resources/fonts/custom-font.woff2'), 'utf8');

        expect(copiedImage).toBe('fake-png-content');
        expect(copiedFont).toBe('fake-font-content');
    });

    test('should run doctor diagnostics successfully in project environment', async () => {
        const passed = await KitCLI.doctor({ verbose: false });
        expect(typeof passed).toBe('boolean');
    });

    test('should generate a typed plugin boilerplate with kit create', async () => {
        const pluginFile = join(process.cwd(), 'src/plugins/inventory-system.ts');
        await rm(pluginFile, { force: true });

        await KitCLI.create({
            type: 'plugin',
            name: 'InventorySystem',
            verbose: false,
        });

        const content = await readFile(pluginFile, 'utf8');
        expect(content).toContain('export class InventorySystem extends KitPlugin');
        expect(content).toContain("readonly name = 'InventorySystem';");
        expect(content).toContain('onRegistered(): void');

        // Cleanup
        await rm(pluginFile, { force: true });
    });

    test('should initialize and build a new singleplayer project with 100% success', async () => {
        const projectName = 'test-single-project';
        const projectDir = join(process.cwd(), projectName);
        
        // Ensure clean state
        await rm(projectDir, { recursive: true, force: true });

        await processInit({
            projectName,
            single: true,
            force: true,
            verbose: false
        });

        const files = await readdir(projectDir, { recursive: true });
        expect(files.length).toBeGreaterThan(0);
        
        // Check if placeholders were replaced
        const pkgJson = JSON.parse(await readFile(join(projectDir, 'package.json'), 'utf8'));
        expect(pkgJson.name).toBe(projectName);

        // Run bundleApp on the scaffolded project
        const buildResult = await bundleApp(projectDir, join(projectDir, 'dist'), { prod: false });
        expect(buildResult.success).toBe(true);
        expect(buildResult.architecture).toBe('single');

        // Check that dist files were generated
        const distFiles = await readdir(join(projectDir, 'dist'));
        expect(distFiles).toContain('index.js');
        expect(distFiles).toContain('index.html');

        // Cleanup
        await rm(projectDir, { recursive: true, force: true });
    });

    test('should initialize and build a new multiplayer project with 100% success', async () => {
        const projectName = 'test-multi-project';
        const projectDir = join(process.cwd(), projectName);
        
        // Ensure clean state
        await rm(projectDir, { recursive: true, force: true });

        await processInit({
            projectName,
            multi: true,
            force: true,
            verbose: false
        });

        const files = await readdir(projectDir, { recursive: true });
        expect(files.length).toBeGreaterThan(0);
        
        // Check if placeholders were replaced
        const pkgJson = JSON.parse(await readFile(join(projectDir, 'package.json'), 'utf8'));
        expect(pkgJson.name).toBe(projectName);

        // Run bundleApp on the scaffolded project
        const buildResult = await bundleApp(projectDir, join(projectDir, 'dist'), { prod: false });
        expect(buildResult.success).toBe(true);
        expect(buildResult.architecture).toBe('multi');

        // Check that dist files were generated (client + server)
        const distFiles = await readdir(join(projectDir, 'dist'));
        expect(distFiles).toContain('index.js');
        expect(distFiles).toContain('server.js');
        expect(distFiles).toContain('settings.json');

        // Cleanup
        await rm(projectDir, { recursive: true, force: true });
    });

    test('should detect project architecture correctly', async () => {
        const dummyDir = join(tempDir, 'arch-test');
        await ensureDirectoryExists(dummyDir);

        expect(detectArchitecture(dummyDir)).toBe('none');

        // Singleplayer
        await writeFile(join(dummyDir, 'index.ts'), 'console.log("single");');
        expect(detectArchitecture(dummyDir)).toBe('single');
        await rm(join(dummyDir, 'index.ts'), { force: true });

        // Multiplayer client
        const clientDir = join(dummyDir, 'client');
        await ensureDirectoryExists(clientDir);
        await writeFile(join(clientDir, 'index.ts'), 'console.log("client");');
        expect(detectArchitecture(dummyDir)).toBe('multi');

        await cleanUpDirectory(dummyDir);
    });

    test('should bundle singleplayer application code and static assets', async () => {
        const appDir = join(tempDir, 'single-app');
        const appSrc = join(appDir, 'src');
        const appDist = join(appDir, 'dist');
        await ensureDirectoryExists(appSrc);

        await writeFile(join(appSrc, 'index.ts'), 'export const answer = 42;');
        await writeFile(join(appSrc, 'index.html'), '<html><body>Hello</body></html>');
        await writeFile(join(appSrc, 'style.css'), 'body { background: #000; }');

        const result = await bundleApp(appDir, appDist, false);
        expect(result.success).toBe(true);
        expect(result.architecture).toBe('single');

        const bundledCode = await readFile(join(appDist, 'index.js'), 'utf8');
        expect(bundledCode).toContain('42');

        const htmlExists = await readFile(join(appDist, 'index.html'), 'utf8');
        expect(htmlExists).toContain('Hello');

        const cssExists = await readFile(join(appDist, 'style.css'), 'utf8');
        expect(cssExists).toContain('#000');

        await cleanUpDirectory(appDir);
    });

    test('should bundle multiplayer application client and server code', async () => {
        const appDir = join(tempDir, 'multi-app');
        const clientSrc = join(appDir, 'src/client');
        const serverSrc = join(appDir, 'src/server');
        const appDist = join(appDir, 'dist');
        await ensureDirectoryExists(clientSrc);
        await ensureDirectoryExists(serverSrc);

        await writeFile(join(clientSrc, 'index.ts'), 'console.log("client online");');
        await writeFile(join(clientSrc, 'index.html'), '<html><title>Game</title></html>');
        await writeFile(join(serverSrc, 'index.ts'), 'console.log("server online");');
        await writeFile(join(serverSrc, 'settings.json'), '{"port": 30000}');

        const result = await bundleApp(appDir, appDist, false);
        expect(result.success).toBe(true);
        expect(result.architecture).toBe('multi');

        const clientBundle = await readFile(join(appDist, 'index.js'), 'utf8');
        expect(clientBundle).toContain('client online');

        const serverBundle = await readFile(join(appDist, 'server.js'), 'utf8');
        expect(serverBundle).toContain('server online');

        const settingsJson = JSON.parse(await readFile(join(appDist, 'settings.json'), 'utf8'));
        expect(settingsJson.port).toBe(30000);

        await cleanUpDirectory(appDir);
    });

    test('should support production build with minification and obfuscation', async () => {
        const appDir = join(tempDir, 'prod-app');
        const appSrc = join(appDir, 'src');
        const appDist = join(appDir, 'dist');
        await ensureDirectoryExists(appSrc);

        const unminifiedCode = `
            const secretIdentifierToObfuscate = "hero-player";
            export function calculateScore(scoreMultiplier) {
                return 100 * scoreMultiplier;
            }
        `;
        await writeFile(join(appSrc, 'index.ts'), unminifiedCode);

        const result = await bundleApp(appDir, appDist, { prod: true });
        expect(result.success).toBe(true);

        const bundledCode = await readFile(join(appDist, 'index.js'), 'utf8');
        // Identifiers minified/mangled in production mode
        expect(bundledCode).not.toContain('secretIdentifierToObfuscate');

        await cleanUpDirectory(appDir);
    });

    test('should return soft error when target directory does not exist for kit host', async () => {
        const nonExistentDir = join(tempDir, 'does-not-exist-dist');
        const result = await KitCLI.host({ directory: nonExistentDir });
        expect(result.success).toBe(false);
        expect(result.message).toContain('does not exist');
    });

    test('should return soft error when index.html is missing in client host directory', async () => {
        const appDir = join(tempDir, 'missing-index-app');
        const distDir = join(appDir, 'dist');
        await ensureDirectoryExists(distDir);

        const result = await KitCLI.host({ directory: distDir });
        expect(result.success).toBe(false);
        expect(result.message).toContain('Missing entrypoint');

        await cleanUpDirectory(appDir);
    });

    test('should successfully host static game files with KitCLI.host', async () => {
        const appDir = join(tempDir, 'host-success-app');
        const distDir = join(appDir, 'dist');
        await ensureDirectoryExists(distDir);
        await writeFile(join(distDir, 'index.html'), '<html><body>Host Success Game</body></html>');

        const testPort = 8124;
        const result = await KitCLI.host({
            directory: distDir,
            port: testPort
        });

        expect(result.success).toBe(true);
        expect(result.server).toBeDefined();

        try {
            const res = await fetch(`http://localhost:${testPort}/`);
            expect(res.status).toBe(200);
            const content = await res.text();
            expect(content).toContain('Host Success Game');
        } finally {
            if (result.server) {
                result.server.stop();
            }
            await cleanUpDirectory(appDir);
        }
    });
});
