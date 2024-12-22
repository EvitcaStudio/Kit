import { promises as fs } from 'fs';
import path from 'path';
import chalk from 'chalk';
import { v4 as uuidv4 } from 'uuid';
import { BuildOptions } from './types/shared-types';

// Helpers to easily log things
const log = console.log;
const info = chalk.hex('#ffa552');
const error = chalk.hex('#c42847');
const alert = chalk.hex('#EFF2C0');

type ResourceType = ['interface', 'icon', 'map', 'sound', 'macros'];
// An array of all directories created via this builder
const resourceTypeDirectories: ResourceType = ['interface', 'icon', 'map', 'sound', 'macros'];


let resourceJSONPath: string = 'resource.json';
let isVerbose: boolean | undefined = false;
let ignoringSound: boolean | undefined = false;

let resourceInDirectory: string = '';
let resourceOutDirectory: string = '';

let resourcesProcessed: number = 0;
let maxResourcesToProcess: number = 0;

type ResourceJSON = {
    interface: { resourceIdentifier: string, fileName: string }[],
    sound: { resourceIdentifier: string, fileName: string }[],
    macro: { resourceIdentifier: string, fileName: string }[],
    map: { resourceIdentifier: string, fileName: string }[],
    icon: { resourceIdentifier: string, fileName: string }[]
}

/**
 * The resource JSON that is built.
 */
const resourceJSON: ResourceJSON = {
    'interface': [],
    'sound': [],
    'macro': [],
    'map': [],
    'icon': []
};

type ValidExtensions = ['vyint', 'vyi', 'vym', 'vymac', 'mp3', 'aac', 'wav', 'm4a', 'ogg', 'flac'];
const validExtensions: ValidExtensions = ['vyint', 'vyi', 'vym', 'vymac', 'mp3', 'aac', 'wav', 'm4a', 'ogg', 'flac'];

/**
 * Processes a file and categorizes it into the resource JSON.
 * @param pFile - The file to be processed.
 */
async function processFile(pFile: string): Promise<void> {
    let preventCountingResource = false;
    // Extract the extension so we know where to put the file in our resource json
    const extension = path.extname(pFile).slice(1);
    // Extract the filename without pathname using regex
    const fileNameWithoutPath = pFile.replace(/^.*[\\\/]/, '');
    // Create a randomized name that will serve as the identifier for this resource
    const resourceIdentifier = `${uuidv4()}.${extension}`;
    // Temp reference to resourceJSON array to use
    let resourceArray: { resourceIdentifier: string, fileName: string }[] | undefined;
    // The directory is the resource folder to generate the file in
    let resourceTypeDirectory: string | undefined;

    switch (extension) {
        // Interface
        case 'vyint':
            resourceArray = resourceJSON.interface;
            resourceTypeDirectory = 'interface';
            break;
        // Icon
        case 'vyi':
            resourceArray = resourceJSON.icon;
            resourceTypeDirectory = 'icon';
            break;
        // Map
        case 'vym':
            resourceArray = resourceJSON.map;
            resourceTypeDirectory = 'map';
            break;
        // Macro
        case 'vymac':
            resourceArray = resourceJSON.macro;
            resourceTypeDirectory = 'macro';
            break;
        // Sound
        case 'mp3':
        case 'wav':
        case 'm4a':
        case 'ogg':
        case 'aac':
        case 'flac':
            if (ignoringSound) {
                // In the event sounds aren't to be processed then we subtract from the amount of needed resources to process.
                --maxResourcesToProcess;
                // We prevent counting this resource from being counted.
                preventCountingResource = true;
                if (isVerbose) {
                    log(`${error('[Ignored File]')} ${pFile} ${alert(`because`)} the ${alert('[ignoreSound]')} flag is enabled`);
                }
                // Combine styled and normal strings
            } else {
                resourceArray = resourceJSON.sound;
                resourceTypeDirectory = 'sound';
            }
            break;       
    }
    // We check if resourceArray has been set, as in some cases it may not be set due to a flag being enabled.
    if (resourceArray) {
        resourceArray.push({ resourceIdentifier: resourceIdentifier, fileName: fileNameWithoutPath });
        await copyFileToDirectory(pFile, `${resourceOutDirectory}/resources/${resourceTypeDirectory}`, `${resourceIdentifier}`);
    }

    // This resource has been built into the resource json, we can increment the resource counter to indicate this resource has been tracked.
    if (!preventCountingResource) {
        resourcesProcessed++;
        const fileNameWithoutExtension = pFile.match(/(.+?)(?=\.[^.]+$|$)/)?.[0] ?? 'incorrectly-parsed-file';
        if (isVerbose) {
            log(`${info('[Processed File]')} ${fileNameWithoutExtension}${info(`.${extension}`)}`);
        }
    }
    // Check if the resources has reached the max, and its at the last resource folder (sounds)
    // Checks also if there is a directory named sound, if not, then we skip and just create the resource json
    if (resourcesProcessed >= maxResourcesToProcess) {
        deleteResourceJSON(); // Delete a file from a certain directory if it exists
    }
}

/**
 * Recursively processes the resource directory categorizing its contents into directories and files.
 * @param pDirectoryPath - The path of the directory to be processed.
 */
async function processDirectory(pDirectoryPath: string): Promise<string[]> {
    return new Promise(async (pResolve, pReject) => {
        const resourcesToProcess: string[] = [];
        try {
            const contents = await fs.readdir(pDirectoryPath);

            for (const item of contents) {
                const itemPath = path.join(pDirectoryPath, item);
                const stats = await fs.stat(itemPath);
                const extension = path.extname(itemPath).slice(1);

                if (stats.isDirectory()) {
                    // Process subdirectories recursively
                    const resources = await processDirectory(itemPath);
                    resourcesToProcess.push(...resources);
                } else {
                    // Iterate over valid extensions to check if this file matches that pattern
                    validExtensions.every((pExtension) => {
                        if (extension.includes(pExtension)) {
                            maxResourcesToProcess++;
                            resourcesToProcess.push(itemPath);
                            return false;
                        }
                        return true;
                    });
                }
                pResolve(resourcesToProcess);
            }
        } catch (pError) {
            log(`${error('[Error]')} processing directory: ${pError}`);
            pReject(pError);
        }
    });
}

// Entry point
export const buildResources = async ({ inDirectory, outDirectory, resourcePath, verbose, ignoreSound }: BuildOptions) => {
    resourceInDirectory = inDirectory;
    resourceOutDirectory = outDirectory;

    resourceJSONPath = `${resourcePath}/resource.json`;
    isVerbose = verbose;
    ignoringSound = ignoreSound;

    if (!resourceInDirectory) {
        log(`${error('[Empty]')} no in directory found! You can specify a input directory via the --in flag`);
        return;
    }
    
    if (!resourceOutDirectory) {
        log(`${error('[Empty]')} no out directory found! You can specify a input directory via the --out flag`);
        return;
    }
    await clearResourceTypeDirectories(`${resourceOutDirectory}/resources`, resourceTypeDirectories);
    const resources = await processDirectory(resourceInDirectory);
    // If there were resources found, then process them
    if (resources.length) {
        resources.forEach((pResourcePath) => {
            processFile(pResourcePath);
        });
    } else {
        log(`${error('[Empty]')} no resources found!`);
        await createResourceJSON(JSON.stringify(resourceJSON));
    }
}

/**
 * Copies a file to a destination directory.
 * @param pSourceFilePath - The path to the source file.
 * @param pDestinationDirectory - The path to the destination directory.
 * @param pNewName - The new name of the copied file.
 */
async function copyFileToDirectory(pSourceFilePath: string, pDestinationDirectory: string, pNewName: string): Promise<void> {
    try {
        // Check if the destination directory exists, if not, create it
        await fs.mkdir(pDestinationDirectory, { recursive: true });

        // Construct the destination file path
        const destinationFilePath = path.join(pDestinationDirectory, pNewName);

        // Copy the file
        await fs.copyFile(pSourceFilePath, destinationFilePath);
    } catch (pError) {
        log(`${error(`[Error]`)} copying ${pSourceFilePath}: ${pError}`);
    }
}

/**
 * Clears specified directories within a base directory.
 * @param pBaseDirectory - The path to the base directory.
 * @param pDirectoriesToRemove - An array of directory names to be removed.
 */
async function clearResourceTypeDirectories(pBaseDirectory: string, pDirectoriesToRemove: string[]): Promise<void> {
    try {
        // Iterate over each directory to remove
        for (const directory of pDirectoriesToRemove) {
            const directoryPath = path.join(pBaseDirectory, directory);
            // Check if the directory exists
            const directoryExists = await fs.stat(directoryPath).then(stat => stat.isDirectory()).catch(() => false);
            // If the directory exists, remove it
            if (directoryExists) {
                await fs.rm(directoryPath, { recursive: true });
            }
        }
    } catch (pError) {
        log(`${error(`[Error]`)} clearing directories: ${pError}`);
    }
}

/**
 * Creates a new resource JSON file with the provided data.
 * @param pFileData - The data to be written to the new JSON file.
 * @returns A Promise that resolves when the file creation is complete.
 */
async function createResourceJSON(pFileData: string): Promise<void> {
    const filePath = path.join(__dirname, `${resourceJSONPath}`);
    try {
        await fs.writeFile(filePath, pFileData);
        log(`${alert(`resource.json`)} created in ${alert(`${resourceJSONPath}`)}`);
    } catch (pError) {
        log(`${error(`[Error]`)} creating resource.json ${pError}`);
    }
}
/**
 * Deletes the resource JSON file if it exists, then creates a new resource JSON with the provided data.
 */
async function deleteResourceJSON(): Promise<void> {
    const filePath = path.join(__dirname, `${resourceJSONPath}`);

    try {
        await fs.access(filePath);
        // File exists, so delete it
        await fs.unlink(filePath);
    } catch (pError) {
        // If any other error other than FILE MISSING
        if (pError.code !== 'ENOENT') {
            log(`${error(`[Error]`)} Error deleting file ${filePath}: ${pError}`);
        }
    }

    // Create a file in a specific directory
    await createResourceJSON(JSON.stringify(resourceJSON));
}