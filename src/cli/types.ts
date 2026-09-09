/**
 * Options for the resource builder and app build process.
 */
export interface ProcessOptions {
    inDirectory?: string;
    outDirectory?: string;
    manifestPath?: string;
    verbose?: boolean;
    ignoreSound?: boolean;
    watch?: boolean;
    app?: boolean;
    minify?: boolean;
    obfuscate?: boolean;
    sourcemap?: 'none' | 'linked' | 'inline' | 'external';
    prod?: boolean;
}