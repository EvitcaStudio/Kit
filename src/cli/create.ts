import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import chalk from 'chalk';
import { theme } from './theme';

export interface CreateOptions {
    type: string;
    name: string;
    verbose?: boolean;
}

/**
 * Formats a given name into a PascalCase class name.
 * @param pName - Raw identifier input.
 */
function toPascalCase(pName: string): string {
    return pName
        .replace(/[-_](\w)/g, (_, c) => c.toUpperCase())
        .replace(/^\w/, c => c.toUpperCase());
}

/**
 * Formats a given name into a kebab-case file name.
 * @param pName - Raw identifier input.
 */
function toKebabCase(pName: string): string {
    return pName
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
}

/**
 * Generates the source code for a custom KitPlugin.
 * @param pClassName - PascalCase class name.
 * @param pPluginName - Plugin string identifier.
 */
function generatePluginSource(pClassName: string, pPluginName: string): string {
    return `import { KitPlugin } from '@evitcastudio/kit';

/**
 * ${pClassName} plugin for the Kit framework.
 */
export class ${pClassName} extends KitPlugin {
    /**
     * Unique name identifier of the plugin.
     */
    readonly name = '${pPluginName}';

    /**
     * Entry point for custom initialization when the plugin is registered with Kit.
     */
    onRegistered(): void {
        // Initialize plugin logic
    }
}
`;
}

/**
 * Handles creation of new boilerplate elements in a Kit project.
 * @param pOptions - Creation configuration options.
 */
export async function processCreate(pOptions: CreateOptions): Promise<void> {
    const { type, name, verbose } = pOptions;

    if (!type || !name) {
        console.error(theme.error('\nError: Both type and name are required. Usage: kit create <type> <name>'));
        process.exit(1);
    }

    const normalizedType = type.toLowerCase();
    if (normalizedType !== 'plugin') {
        console.error(theme.error(`\nError: Unknown create type '${type}'. Supported types: 'plugin'`));
        process.exit(1);
    }

    const className = toPascalCase(name);
    const fileName = `${toKebabCase(name)}.ts`;

    // Standard location for plugins in a game or library project
    const pluginsDir = join(process.cwd(), 'src', 'plugins');
    const targetPath = join(pluginsDir, fileName);

    try {
        await fs.mkdir(pluginsDir, { recursive: true });

        const fileExists = await fs.stat(targetPath).then(() => true).catch(() => false);
        if (fileExists) {
            console.error(theme.error(`\nError: File already exists at ${targetPath}`));
            process.exit(1);
        }

        const sourceCode = generatePluginSource(className, className);
        await fs.writeFile(targetPath, sourceCode, 'utf8');

        console.log(`\n  ${theme.successIcon('✓')} Created plugin ${theme.brandBold(className)} at ${theme.secondary(targetPath)}\n`);
        if (verbose) {
            console.log(theme.secondary(sourceCode));
        }
    } catch (pError) {
        const message = pError instanceof Error ? pError.message : String(pError);
        console.error(theme.error(`\nError creating plugin: ${message}`));
        process.exit(1);
    }
}
