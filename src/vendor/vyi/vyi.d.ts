import { Logger } from './vendor/logger';
import { Icon } from './icon';
import { VyiData, VyiInputData, IconData } from './types';
/**
 * VYI class for managing .vyi files
 */
export declare class VYI {
    /**
     * The version of the module.
     */
    static version: string;
    /** The logger module this module uses to log errors / logs. */
    static logger: Logger;
    /**
     * A map of icons that belong to this VYI
     */
    icons: Map<string, Icon>;
    /**
     * The name of this vyi.
     */
    name: string;
    /**
     * The version of the VYI.
     */
    formatVersion: number;
    /**
     * Initializes this module with the information from the VYI passed.
     * @param pVyiData - A JSON / Javascript object containing the vyi information.
     */
    constructor(pVyiData?: VyiInputData);
    /**
     * Parses the provided VYI data (either a URL, a JSON object, or binary data) and processes it.
     * If the data is a URL (string), it fetches/reads the data and parses it as JSON.
     * If the data is binary, it attempts to inflate it using pako or decode it as plain text.
     *
     * @param pVyiData - The VYI data to parse. Or a path to a VYI file.
     * @returns A promise that resolves when the parsing is completed.
     * @throws Throws an error if fetching, inflating, or decoding fails.
     */
    parse(pVyiData: VyiInputData): VYI;
    /**
     * Read the file from a binary string.
     * @param pVyiData - The compressed binary string representing the vyi data.
     * @returns An vyi that was compressed in the file.
     */
    readFile(pVyiData: string): any;
    /**
     * Reads a file and returns the vyi from it.
     * @param pURL - The URL to read the data from.
     * @returns The vyi from the file.
     */
    private readFileAndGetVYI;
    /**
     * Fetches data from a URL and parses it as JSON.
     * @param pURL - The URL to fetch the data from.
     * @returns A promise that resolves to the parsed JSON data.
     */
    private fetchAndParseJSON;
    /**
     * Handles binary data (ArrayBuffer or Uint8Array). Attempts to inflate or decode it.
     * @param pBinaryData - The binary data to process.
     * @returns The parsed JSON object or decoded string, or null if it fails.
     */
    private handleBinaryData;
    /**
     * Processes the parsed VYI data and adds icons to the VYI module instance.
     * @param pVyi - The parsed VYI data.
     */
    private processVyiData;
    /**
     * Converts old object-based icon data to the new array-based format.
     * @param pOldData - The old format icon data object.
     * @returns The converted IconData array.
     */
    private convertOldIconData;
    /**
     * Adds an icon to this VYI.
     * @param pIconData - The icon data to use.
     * @returns The Icon added or undefined.
     */
    addIcon(pIconData: Icon | IconData): Icon | undefined;
    /**
     * Removes the icon passed.
     * @param pIcon - The icon to remove from this vyi.
     */
    removeIcon(pIcon: Icon): void;
    /**
     * Removes the icon via it's name. The LAST defined icon that has the passed name will be removed. As names are not unique.
     * @param pName - The name to use to find the icon.
     */
    removeIconByName(pName: string): void;
    /**
     * Removes the icon via it's id.
     * @param pId - The id to use to find the icon.
     */
    removeIconById(pId: string): void;
    /**
     * Returns all the icon names in this vyi.
     * @returns An array of icon names in this vyi.
     */
    getIconNames(): string[];
    /**
     * Gets the icon that has the name pName. The LAST defined icon that has the passed name will be returned.
     * @param pName - The name of the icon to get.
     * @returns The icon that has the name pName or undefined.
     */
    getIcon(pName: string): Icon | undefined;
    /**
     * Gets the number of icons this vyi has.
     * @returns The amount of icons this vyi has.
     */
    getIconCount(): number;
    /**
     * Gets an icon by the id provided.
     * @param pId - The id of the icon.
     * @returns The icon that has the id that was passed.
     */
    getIconById(pId: string): Icon | undefined;
    /**
     * Gets all the icons in this vyi.
     * @returns Array of all icons
     */
    getIcons(): Icon[];
    /**
     * Renames the vyi.
     * @param pName - The name to give this vyi.
     */
    rename(pName: string): void;
    /**
     * Gets the name of the vyi.
     * @returns The name of the vyi.
     */
    getName(): string;
    /**
     * Exports this VYI into VYI format.
     * @param pCompressed - Whether the data will be compressed.
     * @returns Returns the vyi data in either a binary string or an object.
     */
    export(pCompressed?: boolean): VyiData | Uint8Array;
}
