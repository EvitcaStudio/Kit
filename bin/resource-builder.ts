import type { ProcessOptions } from './types/shared-types';
import { promises as fs } from 'fs';
import { join, extname, basename, parse } from 'path';
import chalk from 'chalk';
import { v4 as uuidv4 } from 'uuid';

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
const resourcesToProcess: { filePath: string; type: typeof RESOURCE_TYPES[number] }[] = [];

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
function prepareFileForProcessing(filePath: string): void {
    const extension = extname(filePath).slice(1);
    const fileName = basename(filePath);
    const resourceIdentifier = `${uuidv4()}.vyr`;

    const type = getResourceType(extension);
    if (!type) return;

    if (type === 'sound' && ignoringSound) {
        logVerbose(`[Ignored File] ${filePath} (ignoreSound flag enabled)`);
        return;
    }

    resourcesToProcess.push({ filePath, type });
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
            const stats = await fs.stat(itemPath);

            if (stats.isDirectory()) {
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

        logVerbose(`[Kit CLI] All resources have been processed.`);
        await saveResourceJSON();
    } catch (pError: any) {
        logError(`[Error] Processing files in batch: ${pError.message}`);
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
        await fs.copyFile(pSource, join(pDestinationDir, pNewName));
    } catch (pError) {
        logError(`[Error] Copying file ${pSource}: ${pError}`);
    }
}

/**
 * Saves the resource JSON to a file.
 */
async function saveResourceJSON(): Promise<void> {
    const filePath = 'resource.json';
    try {
        await fs.writeFile(filePath, JSON.stringify(resourceJSON, null, 4));
    } catch (pError) {
        logError(`[Error] Saving resource JSON: ${pError}`);
    }
}

/**
 * Main entry point for building resources.
 */
export async function processResources({ inDirectory, outDirectory, verbose, ignoreSound }: ProcessOptions): Promise<void> {
    // Initialize state
    resourceInDirectory = inDirectory;
    resourceOutDirectory = outDirectory;
    isVerbose = verbose;
    ignoringSound = ignoreSound;
    resourceJSON = initializeResourceJSON();

    // Validate inputs
    if (!resourceInDirectory || !resourceOutDirectory) {
        logError('[Error] Input and output directories must be specified');
        return;
    }

    // Process resources
    await processDirectory(resourceInDirectory);

    if (resourcesToProcess.length > 0) {
        await processAllFiles();
    } else {
        logAlert('No resources found!');
        await saveResourceJSON();
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
