import type { ProcessOptions } from './types';
import { promises as fs, existsSync } from 'fs';
import { join, extname, basename, resolve, relative } from 'path';
import chalk from 'chalk';
import { watch as chokidarWatch } from 'chokidar';
import { v4 as uuidv4 } from 'uuid';
import { VYI } from '../vendor/vyi';
import { bundleApp } from './app-bundler';

// Logging helpers
const log = console.log;
const info = chalk.hex('#ffa552');
const error = chalk.hex('#c42847');
const alert = chalk.hex('#EFF2C0');

// Resource types and valid file extensions
const RESOURCE_TYPES = ['interface', 'icon', 'map', 'sound', 'macros'];
const VALID_EXTENSIONS = ['vyint', 'vyi', 'vym', 'vymac', 'mp3', 'aac', 'wav', 'm4a', 'ogg', 'flac'] as const;

type ResourceJSON = Record<typeof RESOURCE_TYPES[number], { resourceIdentifier: string; fileName: string }[]>;

// State variables
let resourceJSON: ResourceJSON = initializeResourceJSON();
let isVerbose: boolean | undefined = false;
let ignoringSound: boolean | undefined = false;
let resourceInDirectory = '';
let resourceOutDirectory = '';
let customManifestPath: string | undefined = undefined;
const resourcesToProcess: { filePath: string; type: typeof RESOURCE_TYPES[number] }[] = [];
const subdirectoriesToMirror: string[] = [];

/**
 * Initializes the resource JSON structure.
 */
function initializeResourceJSON(): ResourceJSON {
    return RESOURCE_TYPES.reduce((acc, type) => {
        acc[type] = [];
        return acc;
    }, {} as ResourceJSON);
}

/**
 * Processes a single file and updates the resource JSON.
 */
function prepareFileForProcessing(pFilePath: string): void {
    const extension = extname(pFilePath).slice(1);
    const fileName = basename(pFilePath);
    const resourceIdentifier = `${uuidv4()}.vyr`;

    const type = getResourceType(extension);
    if (!type) return;

    if (type === 'sound' && ignoringSound) {
        logVerbose(`[Ignored File] ${pFilePath} (ignoreSound flag enabled)`);
        return;
    }

    resourcesToProcess.push({ filePath: pFilePath, type });
    resourceJSON[type].push({ resourceIdentifier, fileName });
}

/**
 * Determines the resource type based on the file extension.
 */
function getResourceType(pExtension: string): typeof RESOURCE_TYPES[number] | null {
    switch (pExtension) {
        case 'vyint': return 'interface';
        case 'vyi': return 'icon';
        case 'vym': return 'map';
        case 'vymac': return 'macros';
        case 'mp3':
        case 'aac':
        case 'wav':
        case 'm4a':
        case 'ogg':
        case 'flac': return 'sound';
        default: return null;
    }
}

/**
 * Processes a directory and its contents recursively.
 */
async function processDirectory(pDirectoryPath: string): Promise<void> {
    try {
        const contents = await fs.readdir(pDirectoryPath);

        for (const item of contents) {
            const itemPath = join(pDirectoryPath, item);
            // Skip the output directory if it is inside the input directory
            if (resolve(itemPath) === resourceOutDirectory) {
                continue;
            }

            const stats = await fs.stat(itemPath);

            if (stats.isDirectory()) {
                // If top-level subdirectory inside inDirectory, track for mirroring
                if (pDirectoryPath === resourceInDirectory) {
                    subdirectoriesToMirror.push(item);
                }
                await processDirectory(itemPath);
            } else if (isValidExtension(extname(itemPath).slice(1))) {
                prepareFileForProcessing(itemPath);
            }
        }
    } catch (pError) {
        logError(`[Error] Processing directory: ${pError}`);
    }
}

/**
 * Checks if a file extension is valid.
 */
function isValidExtension(pExtension: string): boolean {
    return VALID_EXTENSIONS.includes(pExtension as typeof VALID_EXTENSIONS[number]);
}

// Engine resource formats handled by Vylocity obfuscation
const ENGINE_EXTENSIONS = ['vyint', 'vyi', 'vym', 'vymac'] as const;

/**
 * Checks if a file extension is a Vylocity engine binary/definition format.
 * @param pExtension - The file extension to test.
 * @returns True if the extension is an engine format.
 */
function isEngineExtension(pExtension: string): boolean {
    return (ENGINE_EXTENSIONS as readonly string[]).includes(pExtension);
}

/**
 * Recursively copies a directory to destination, preserving subdirectories and files.
 * Ignores engine resource files (vyint, vyi, vym, vymac) that are handled by Vylocity obfuscation,
 * while ensuring media and custom assets (sounds, images, fonts, json) retain their structure.
 * @param pSourceDir - The source directory to copy.
 * @param pDestDir - The target destination directory.
 */
async function mirrorDirectory(pSourceDir: string, pDestDir: string): Promise<void> {
    const entries = await fs.readdir(pSourceDir, { withFileTypes: true });
    await fs.mkdir(pDestDir, { recursive: true });

    for (const entry of entries) {
        const srcPath = join(pSourceDir, entry.name);
        const destPath = join(pDestDir, entry.name);

        if (entry.isDirectory()) {
            await mirrorDirectory(srcPath, destPath);
        } else {
            const ext = extname(entry.name).slice(1);
            // Copy all assets except internal Vylocity engine binary formats
            if (!isEngineExtension(ext)) {
                const data = await fs.readFile(srcPath);
                await fs.writeFile(destPath, data);
            }
        }
    }
}

/**
 * Executes all file copy operations in parallel after preparation.
 */
async function processAllFiles(): Promise<void> {
    try {
        await clearResourceTypeDirectories(`${resourceOutDirectory}/resources`);
        // Create copy operations for all files
        const copyOperations = resourcesToProcess.map(({ filePath, type }) => {
            const fileName = basename(filePath);
            const resource = resourceJSON[type].find(res => res.fileName === fileName);

            if (!resource) {
                throw new Error(`Resource not found for file: ${fileName}`);
            }

            const destination = join(resourceOutDirectory, 'resources');
            const resourceName = resource.resourceIdentifier;
            return copyFile(filePath, destination, resourceName);
        });

        // Execute all copy operations concurrently
        await Promise.all(copyOperations);

        // Mirror subdirectories (images, fonts, emitters, particles, etc.)
        for (const subDir of subdirectoriesToMirror) {
            const srcPath = join(resourceInDirectory, subDir);
            const destPath = join(resourceOutDirectory, 'resources', subDir);
            await mirrorDirectory(srcPath, destPath);
        }

        logVerbose(`[Kit CLI] All resources have been processed.`);
        await saveResourceJSON();
        const boundsData = await buildBoundsJSON();
        await saveBoundsJSON(boundsData);
        const pointsData = await buildIconPointsJSON();
        await saveIconPointsJSON(pointsData);
        const sizesData = await buildSizesJSON();
        await saveSizesJSON(sizesData);
    } catch (pError) {
        const errorMessage = pError instanceof Error ? pError.message : String(pError);
        logError(`[Error] Processing files in batch: ${errorMessage}`);
    }
}

/**
 * Builds the bounds map from all processed vyi files.
 */
async function buildBoundsJSON(): Promise<Record<string, unknown>> {
    const boundsData: Record<string, unknown> = {};

    for (const { filePath, type } of resourcesToProcess) {
        if (type !== 'icon') continue;

        try {
            const fileBuffer = await fs.readFile(filePath);
            const vyi = new VYI().parse(fileBuffer);
            const atlasName = basename(filePath, '.vyi');
            const atlasEntry: Record<string, unknown> = {};

            for (const icon of vyi.getIcons()) {
                const iconName = icon.getName();
                const iconBounds = icon.getBoundsExport();
                const hasIconBounds = Object.keys(iconBounds).length > 0;

                const iconEntry: Record<string, unknown> = {};
                if (hasIconBounds) {
                    iconEntry.bounds = iconBounds;
                }

                const statesEntry: Record<string, unknown> = {};
                for (const state of icon.getStates()) {
                    const stateName = state.getName();
                    const stateBounds = state.getBoundsExport();
                    if (Object.keys(stateBounds).length > 0) {
                        statesEntry[stateName] = {
                            bounds: stateBounds
                        };
                    }
                }

                if (Object.keys(statesEntry).length > 0) {
                    iconEntry.states = statesEntry;
                }

                if (Object.keys(iconEntry).length > 0) {
                    atlasEntry[iconName] = iconEntry;
                }
            }

            if (Object.keys(atlasEntry).length > 0) {
                boundsData[atlasName] = atlasEntry;
            }
        } catch (pError) {
            logError(`[Error] Failed to parse bounds from ${filePath}: ${pError}`);
        }
    }

    return boundsData;
}

/**
 * Saves the bounds JSON to a file.
 */
async function saveBoundsJSON(pBoundsData: Record<string, unknown>): Promise<void> {
    const filePath = 'bounds.json';
    try {
        await fs.writeFile(filePath, JSON.stringify(pBoundsData));
    } catch (pError) {
        logError(`[Error] Saving bounds JSON: ${pError}`);
    }
}

/**
 * Builds the icon points map from all processed vyi files.
 */
async function buildIconPointsJSON(): Promise<Record<string, unknown>> {
    const pointsData: Record<string, unknown> = {};

    for (const { filePath, type } of resourcesToProcess) {
        if (type !== 'icon') continue;

        try {
            const fileBuffer = await fs.readFile(filePath);
            const vyi = new VYI().parse(fileBuffer);
            const atlasName = basename(filePath, '.vyi');
            const atlasEntry: Record<string, unknown> = {};

            for (const icon of vyi.getIcons()) {
                const iconName = icon.getName();
                const iconPoints = icon.getIconPointsExport();
                const hasIconPoints = iconPoints && iconPoints.length > 0;

                const iconEntry: Record<string, unknown> = {};
                if (hasIconPoints) {
                    const pointsMap: Record<string, unknown> = {};
                    for (const pt of iconPoints) {
                        pointsMap[pt.id] = {
                            width: pt.width,
                            height: pt.height,
                            x: pt.x,
                            y: pt.y
                        };
                    }
                    iconEntry.points = pointsMap;
                }

                const statesEntry: Record<string, unknown> = {};
                for (const state of icon.getStates()) {
                    const stateName = state.getName();
                    const statePoints = state.getIconPointsExport();
                    if (statePoints && statePoints.length > 0) {
                        const statePointsMap: Record<string, unknown> = {};
                        for (const pt of statePoints) {
                            statePointsMap[pt.id] = {
                                width: pt.width,
                                height: pt.height,
                                x: pt.x,
                                y: pt.y
                            };
                        }
                        statesEntry[stateName] = {
                            points: statePointsMap
                        };
                    }
                }

                if (Object.keys(statesEntry).length > 0) {
                    iconEntry.states = statesEntry;
                }

                if (Object.keys(iconEntry).length > 0) {
                    atlasEntry[iconName] = iconEntry;
                }
            }

            if (Object.keys(atlasEntry).length > 0) {
                pointsData[atlasName] = atlasEntry;
            }
        } catch (pError) {
            logError(`[Error] Failed to parse icon points from ${filePath}: ${pError}`);
        }
    }

    return pointsData;
}

/**
 * Saves the icon points JSON to a file.
 */
async function saveIconPointsJSON(pPointsData: Record<string, unknown>): Promise<void> {
    const filePath = 'icon-points.json';
    try {
        await fs.writeFile(filePath, JSON.stringify(pPointsData));
    } catch (pError) {
        logError(`[Error] Saving icon points JSON: ${pError}`);
    }
}

/**
 * Builds the sizes map from all processed vyi files.
 */
async function buildSizesJSON(): Promise<Record<string, unknown>> {
    const sizesData: Record<string, unknown> = {};

    for (const { filePath, type } of resourcesToProcess) {
        if (type !== 'icon') continue;

        try {
            const fileBuffer = await fs.readFile(filePath);
            const vyi = new VYI().parse(fileBuffer);
            const atlasName = basename(filePath, '.vyi');
            const atlasEntry: Record<string, { width: number; height: number }> = {};

            for (const icon of vyi.getIcons()) {
                atlasEntry[icon.getName()] = {
                    width: icon.getWidth(),
                    height: icon.getHeight()
                };
            }

            if (Object.keys(atlasEntry).length > 0) {
                sizesData[atlasName] = atlasEntry;
            }
        } catch (pError) {
            logError(`[Error] Failed to parse sizes from ${filePath}: ${pError}`);
        }
    }

    return sizesData;
}

/**
 * Saves the sizes JSON to a file.
 */
async function saveSizesJSON(pSizesData: Record<string, unknown>): Promise<void> {
    const filePath = 'sizes.json';
    try {
        await fs.writeFile(filePath, JSON.stringify(pSizesData));
    } catch (pError) {
        logError(`[Error] Saving sizes JSON: ${pError}`);
    }
}

/**
 * Clears specified directories within a base directory.
 * @param pBaseDirectory - The path to the base directory.
 */
async function clearResourceTypeDirectories(pBaseDirectory: string): Promise<void> {
    try {
        const directoryExists = await fs.stat(pBaseDirectory).then(stat => stat.isDirectory()).catch(() => false);
        if (directoryExists) {
            await fs.rm(pBaseDirectory, { recursive: true });
        }
    } catch (pError) {
        log(`${error(`[Error]`)} clearing resource directory: ${pError}`);
    }
}


/**
 * Copies a file to the specified directory.
 */
async function copyFile(pSource: string, pDestinationDir: string, pNewName: string): Promise<void> {
    try {
        await fs.mkdir(pDestinationDir, { recursive: true });
        // Use readFile + writeFile instead of fs.copyFile to avoid macOS APFS
        // clone operations, which emit phantom FSEvents on the source file and
        // cause external editors (e.g. Viewer) to falsely detect modifications.
        const data = await fs.readFile(pSource);
        await fs.writeFile(join(pDestinationDir, pNewName), data);
    } catch (pError) {
        logError(`[Error] Copying file ${pSource}: ${pError}`);
    }
}

/**
 * Saves the resource JSON to a file.
 */
async function saveResourceJSON(): Promise<void> {
    const jsonContent = JSON.stringify(resourceJSON, null, 4);
    const targetPath = customManifestPath || 'resource.json';

    try {
        await fs.writeFile(targetPath, jsonContent, 'utf8');
    } catch (pError) {
        logError(`[Error] Saving resource JSON to ${targetPath}: ${pError}`);
    }
}

let shouldBundleApp = false;
let projectRootDirectory = '';
let appBundleOptions: {
    minify?: boolean;
    obfuscate?: boolean;
    sourcemap?: 'none' | 'linked' | 'inline' | 'external';
    prod?: boolean;
    verbose?: boolean;
} = {};

/**
 * Executes a single build pass over the input assets.
 */
async function runBuild(): Promise<void> {
    resourceJSON = initializeResourceJSON();
    resourcesToProcess.length = 0;
    subdirectoriesToMirror.length = 0;

    if (existsSync(resourceInDirectory)) {
        await processDirectory(resourceInDirectory);
    }

    if (resourcesToProcess.length > 0 || subdirectoriesToMirror.length > 0) {
        await processAllFiles();
    } else {
        logAlert('No resources found!');
        await saveResourceJSON();
        await saveBoundsJSON({});
        await saveIconPointsJSON({});
        await saveSizesJSON({});
    }

    // If app bundling is requested or enabled by default, compile app and copy web assets
    if (shouldBundleApp && projectRootDirectory) {
        await bundleApp(projectRootDirectory, resourceOutDirectory, {
            ...appBundleOptions,
            verbose: Boolean(isVerbose)
        });
    }

    logVerbose(`[Kit CLI] Resources built successfully.`);
}

/**
 * Watches the input directory for changes and triggers incremental rebuilds.
 */
async function runWatch(): Promise<void> {
    await runBuild();

    const pathsToWatch: string[] = [];
    if (existsSync(resourceInDirectory)) {
        pathsToWatch.push(resourceInDirectory);
    }

    const srcDir = join(projectRootDirectory, 'src');
    if (shouldBundleApp && existsSync(srcDir) && srcDir !== resourceInDirectory) {
        pathsToWatch.push(srcDir);
    }

    const displayPaths = pathsToWatch
        .map(p => chalk.bold(relative(projectRootDirectory, p) || p))
        .join(', ');
    console.log(chalk.cyan(`\nWatching for changes in: ${displayPaths}`));

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    let isRebuilding = false;
    let queuedChange: string | null = null;

    const triggerRebuild = (pFilename: string): void => {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async () => {
            if (isRebuilding) {
                queuedChange = pFilename;
                return;
            }
            isRebuilding = true;
            try {
                console.log(chalk.dim(`\nFile changed: ${pFilename}, rebuilding...`));
                await runBuild();
            } finally {
                isRebuilding = false;
                if (queuedChange) {
                    const next = queuedChange;
                    queuedChange = null;
                    triggerRebuild(next);
                }
            }
        }, 150);
    };

    const normalizedOutDir = resourceOutDirectory ? resourceOutDirectory.replace(/\\/g, '/') : '';

    const isIgnored = (pPath: string): boolean => {
        const normalized = pPath.replace(/\\/g, '/');

        // Ignore output directory
        if (normalizedOutDir && (normalized === normalizedOutDir || normalized.startsWith(`${normalizedOutDir}/`))) {
            return true;
        }

        // Ignore VCS and dependency folders
        if (/(^|[/\\])(\.git|node_modules|\.DS_Store|Thumbs\.db)($|[/\\])/.test(normalized)) {
            return true;
        }

        // Ignore vendor directory (precompiled/static vendor assets)
        if (/(^|[/\\])vendor([/\\]|$)/.test(normalized)) {
            return true;
        }

        // Ignore sourcemaps
        if (normalized.endsWith('.map')) {
            return true;
        }

        // Ignore generated manifest metadata files in project root
        if (
            normalized.endsWith('resource.json') ||
            normalized.endsWith('bounds.json') ||
            normalized.endsWith('icon-points.json') ||
            normalized.endsWith('sizes.json')
        ) {
            return true;
        }

        return false;
    };

    // Track known file modification times and sizes to eliminate phantom change events from copy/read operations
    const fileStats = new Map<string, { mtime: number; size: number }>();

    const recordFileStat = async (pFilePath: string): Promise<void> => {
        try {
            const stats = await fs.stat(pFilePath);
            if (stats.isFile()) {
                fileStats.set(resolve(pFilePath), { mtime: stats.mtimeMs, size: stats.size });
            }
        } catch {
            // Ignored
        }
    };

    const primeDirectoryStats = async (pDirPath: string): Promise<void> => {
        try {
            const entries = await fs.readdir(pDirPath, { withFileTypes: true });
            for (const entry of entries) {
                const fullPath = join(pDirPath, entry.name);
                if (isIgnored(fullPath)) continue;
                if (entry.isDirectory()) {
                    await primeDirectoryStats(fullPath);
                } else if (entry.isFile()) {
                    await recordFileStat(fullPath);
                }
            }
        } catch {
            // Ignored
        }
    };

    for (const p of pathsToWatch) {
        await primeDirectoryStats(p);
    }

    const watcher = chokidarWatch(pathsToWatch, {
        ignored: isIgnored,
        ignoreInitial: true,
        awaitWriteFinish: {
            stabilityThreshold: 100,
            pollInterval: 50
        }
    });

    watcher.on('all', async (event, filePath) => {
        if (event === 'addDir' || event === 'unlinkDir') return;

        const absPath = resolve(filePath);
        if (event === 'unlink') {
            fileStats.delete(absPath);
            const relativePath = relative(projectRootDirectory, filePath).replace(/\\/g, '/');
            triggerRebuild(relativePath);
            return;
        }

        // Verify mtime or size actually changed to eliminate phantom OS events
        const stats = await fs.stat(absPath).catch(() => null);
        if (!stats) return;

        const prev = fileStats.get(absPath);
        if (prev && prev.mtime === stats.mtimeMs && prev.size === stats.size) {
            return;
        }

        fileStats.set(absPath, { mtime: stats.mtimeMs, size: stats.size });
        const relativePath = relative(projectRootDirectory, filePath).replace(/\\/g, '/');
        triggerRebuild(relativePath);
    });

    process.on('SIGINT', async () => {
        await watcher.close();
        process.exit(0);
    });
}

/**
 * Main entry point for building resources.
 */
export async function processResources({ inDirectory, outDirectory, manifestPath, watch, verbose, ignoreSound, app, minify, obfuscate, sourcemap, prod }: ProcessOptions): Promise<void> {
    projectRootDirectory = process.cwd();

    // Smart defaults: ./src/resources -> ./dist
    const resolvedIn = inDirectory || (existsSync(join(projectRootDirectory, 'src', 'resources')) ? 'src/resources' : '');
    const resolvedOut = outDirectory || 'dist';

    resourceInDirectory = resolvedIn ? resolve(resolvedIn) : '';
    resourceOutDirectory = resolvedOut ? resolve(resolvedOut) : '';
    customManifestPath = manifestPath;
    isVerbose = verbose;
    ignoringSound = ignoreSound;

    appBundleOptions = {
        minify,
        obfuscate,
        sourcemap,
        prod
    };

    // Enable app bundling if explicitly requested or if app entrypoints exist and app is not false
    const hasAppEntry = existsSync(join(projectRootDirectory, 'src', 'index.ts')) ||
        existsSync(join(projectRootDirectory, 'src', 'client', 'index.ts')) ||
        existsSync(join(projectRootDirectory, 'src', 'server', 'index.ts'));

    shouldBundleApp = app !== undefined ? app : hasAppEntry;

    // Validate inputs
    if (!resourceInDirectory || !resourceOutDirectory) {
        logError('[Error] Input and output directories must be specified');
        return;
    }

    if (watch) {
        await runWatch();
    } else {
        await runBuild();
    }
}

function logVerbose(pMessage: string): void {
    if (isVerbose) log(info(pMessage));
}

function logError(pMessage: string): void {
    log(error(pMessage));
}

function logAlert(pMessage: string): void {
    log(alert(pMessage));
}

