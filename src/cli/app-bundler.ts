import { promises as fs, existsSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import chalk from 'chalk';
import Bun from 'bun';

export type ProjectArchitecture = 'single' | 'multi' | 'none';

export interface BundleAppOptions {
    minify?: boolean;
    obfuscate?: boolean;
    sourcemap?: 'none' | 'linked' | 'inline' | 'external';
    prod?: boolean;
    verbose?: boolean;
}

export interface AppBundleResult {
    architecture: ProjectArchitecture;
    clientBuildTime?: number;
    serverBuildTime?: number;
    success: boolean;
}

/**
 * Detects the project architecture based on existing entrypoints in the source directory.
 * @param pSrcDir - Path to the project's source directory.
 * @returns The detected project architecture.
 */
export function detectArchitecture(pSrcDir: string): ProjectArchitecture {
    const hasClientEntry = existsSync(join(pSrcDir, 'client', 'index.ts'));
    const hasServerEntry = existsSync(join(pSrcDir, 'server', 'index.ts'));
    const hasSingleEntry = existsSync(join(pSrcDir, 'index.ts'));

    if (hasClientEntry || hasServerEntry) {
        return 'multi';
    }
    if (hasSingleEntry) {
        return 'single';
    }
    return 'none';
}

/**
 * Recursively copies a directory to the destination.
 * @param pSourceDir - Directory to copy from.
 * @param pDestDir - Directory to copy to.
 */
async function copyDirectoryRecursive(pSourceDir: string, pDestDir: string): Promise<void> {
    if (!existsSync(pSourceDir)) return;
    const entries = await fs.readdir(pSourceDir, { withFileTypes: true });
    await fs.mkdir(pDestDir, { recursive: true });

    for (const entry of entries) {
        const srcPath = join(pSourceDir, entry.name);
        const destPath = join(pDestDir, entry.name);

        if (entry.isDirectory()) {
            await copyDirectoryRecursive(srcPath, destPath);
        } else {
            await fs.copyFile(srcPath, destPath);
        }
    }
}

/**
 * Copies static web assets (.html, .css, .ico) from source to destination.
 * @param pSourceDir - Source directory to search.
 * @param pDestDir - Output destination directory.
 * @param pBaseDir - Base directory to preserve relative paths from.
 */
async function copyStaticWebFiles(pSourceDir: string, pDestDir: string, pBaseDir: string): Promise<void> {
    if (!existsSync(pSourceDir)) return;
    const entries = await fs.readdir(pSourceDir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = join(pSourceDir, entry.name);

        if (entry.isDirectory()) {
            if (entry.name === 'vendor' || entry.name === 'resources' || entry.name === 'node_modules') {
                continue;
            }
            await copyStaticWebFiles(fullPath, pDestDir, pBaseDir);
        } else {
            const ext = extname(entry.name).toLowerCase();
            if (['.html', '.css', '.ico'].includes(ext)) {
                const relativePath = fullPath.slice(pBaseDir.length).replace(/^[/\\]+/, '');
                const targetPath = join(pDestDir, relativePath);
                await fs.mkdir(dirname(targetPath), { recursive: true });
                await fs.copyFile(fullPath, targetPath);
            }
        }
    }
}

/**
 * Builds the application game code and static assets for singleplayer or multiplayer architectures.
 * @param pProjectRoot - The project root directory.
 * @param pOutDir - The destination output directory.
 * @param pOptions - Build and bundling options.
 * @returns The build result including build times and architecture.
 */
export async function bundleApp(pProjectRoot: string, pOutDir: string, pOptions: BundleAppOptions = {}): Promise<AppBundleResult> {
    const srcDir = join(pProjectRoot, 'src');
    const architecture = detectArchitecture(srcDir);
    const isVerbose = Boolean(pOptions.verbose);

    if (architecture === 'none') {
        if (isVerbose) {
            console.log(chalk.yellow('[Kit CLI] No application entrypoint detected (src/index.ts or src/client/index.ts). Skipping code bundle.'));
        }
        return { architecture: 'none', success: true };
    }

    const isProd = Boolean(pOptions.prod);
    const shouldMinify = isProd || Boolean(pOptions.minify);
    const shouldObfuscate = isProd || Boolean(pOptions.obfuscate);
    const sourcemapMode = pOptions.sourcemap ?? (isProd ? 'none' : 'linked');

    // Read package.json banner if available
    let banner = '';
    const pkgPath = join(pProjectRoot, 'package.json');
    if (existsSync(pkgPath)) {
        try {
            const pkg = JSON.parse(await fs.readFile(pkgPath, 'utf8'));
            banner = [
                '/*!',
                ` * ${pkg.name || 'game'}@${pkg.version || '1.0.0'}`,
                ` * Compiled ${new Date().toUTCString().replace(/GMT/g, 'UTC')}`,
                ' *',
                ` * ${pkg.name || 'game'} is privately licensed. All rights reserved.`,
                ` * Author: ${pkg.author ?? 'Unnamed'}`,
                ' */',
            ].join('\n');
        } catch {
            // Ignored
        }
    }

    try {
        if (architecture === 'single') {
            const startStamp = Date.now();
            const clientResult = await Bun.build({
                entrypoints: [join(srcDir, 'index.ts')],
                naming: 'index.js',
                outdir: pOutDir,
                target: 'browser',
                banner,
                sourcemap: sourcemapMode,
                minify: shouldMinify ? {
                    identifiers: shouldObfuscate,
                    syntax: true,
                    whitespace: true
                } : false
            });

            if (!clientResult.success) {
                console.error(clientResult.logs);
                throw new AggregateError(clientResult.logs, 'Client build failed');
            }

            await copyStaticWebFiles(srcDir, pOutDir, srcDir);

            const rootFavicon = join(pProjectRoot, 'favicon.ico');
            if (existsSync(rootFavicon)) {
                await fs.copyFile(rootFavicon, join(pOutDir, 'favicon.ico'));
            }

            const vendorDir = join(srcDir, 'vendor');
            if (existsSync(vendorDir)) {
                await copyDirectoryRecursive(vendorDir, join(pOutDir, 'vendor'));
            }

            const elapsed = Date.now() - startStamp;
            if (isVerbose) {
                console.log(chalk.hex('#ffa552')(`[Kit CLI] Singleplayer Client Build took: ${elapsed}ms`));
            }

            return { architecture: 'single', clientBuildTime: elapsed, success: true };
        }

        if (architecture === 'multi') {
            const clientEntry = join(srcDir, 'client', 'index.ts');
            const serverEntry = join(srcDir, 'server', 'index.ts');
            let clientElapsed = 0;
            let serverElapsed = 0;

            if (existsSync(clientEntry)) {
                const clientStart = Date.now();
                const clientResult = await Bun.build({
                    entrypoints: [clientEntry],
                    naming: 'index.js',
                    outdir: pOutDir,
                    target: 'browser',
                    banner,
                    sourcemap: sourcemapMode,
                    minify: shouldMinify ? {
                        identifiers: shouldObfuscate,
                        syntax: true,
                        whitespace: true
                    } : false
                });

                if (!clientResult.success) {
                    console.error(clientResult.logs);
                    throw new AggregateError(clientResult.logs, 'Multiplayer client build failed');
                }

                const clientSrc = join(srcDir, 'client');
                await copyStaticWebFiles(clientSrc, pOutDir, clientSrc);

                const clientVendor = join(clientSrc, 'vendor');
                if (existsSync(clientVendor)) {
                    await copyDirectoryRecursive(clientVendor, join(pOutDir, 'vendor'));
                }

                clientElapsed = Date.now() - clientStart;
            }

            if (existsSync(serverEntry)) {
                const serverStart = Date.now();
                const serverResult = await Bun.build({
                    entrypoints: [serverEntry],
                    naming: 'server.js',
                    outdir: pOutDir,
                    target: 'node',
                    banner,
                    sourcemap: sourcemapMode,
                    minify: shouldMinify ? {
                        identifiers: shouldObfuscate,
                        syntax: true,
                        whitespace: true
                    } : false
                });

                if (!serverResult.success) {
                    console.error(serverResult.logs);
                    throw new AggregateError(serverResult.logs, 'Multiplayer server build failed');
                }

                const settingsFile = join(srcDir, 'server', 'settings.json');
                if (existsSync(settingsFile)) {
                    await fs.copyFile(settingsFile, join(pOutDir, 'settings.json'));
                }

                serverElapsed = Date.now() - serverStart;
            }

            const rootFavicon = join(pProjectRoot, 'favicon.ico');
            if (existsSync(rootFavicon)) {
                await fs.copyFile(rootFavicon, join(pOutDir, 'favicon.ico'));
            }

            if (isVerbose) {
                if (clientElapsed) {
                    console.log(chalk.hex('#ffa552')(`[Kit CLI] Multiplayer Client Build took: ${clientElapsed}ms`));
                }
                if (serverElapsed) {
                    console.log(chalk.hex('#ffa552')(`[Kit CLI] Multiplayer Server Build took: ${serverElapsed}ms`));
                }
            }

            return {
                architecture: 'multi',
                clientBuildTime: clientElapsed,
                serverBuildTime: serverElapsed,
                success: true
            };
        }

        return { architecture: 'none', success: true };
    } catch (pError) {
        console.error(chalk.hex('#c42847')(`[Kit CLI Build Error] ${pError}`));
        return { architecture, success: false };
    }
}
