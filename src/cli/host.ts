import { existsSync, readFileSync } from 'fs';
import { join, resolve } from 'path';
import { networkInterfaces } from 'os';
import chalk from 'chalk';
import { detectArchitecture } from './app-bundler';
import { theme } from './theme';

/**
 * Options for hosting the project.
 */
export interface HostOptions {
    /**
     * Port to bind the server to (default: 8090).
     */
    port?: number;
    /**
     * Directory containing built files to serve (default: ./dist).
     */
    directory?: string;
    /**
     * Whether to trigger a build before hosting (default: false).
     */
    build?: boolean;
    /**
     * Whether to log detailed server events.
     */
    verbose?: boolean;
}

/**
 * Result of the host process.
 */
export interface HostResult {
    /**
     * Whether the host process started successfully.
     */
    success: boolean;
    /**
     * Explanation of the result or error message.
     */
    message: string;
    /**
     * Server instance if static HTTP server was started.
     */
    server?: { stop(): void; port: number };
}

/**
 * Retrieves the primary local IPv4 address for local network access.
 * @returns Primary LAN IPv4 address or localhost fallback.
 */
function getNetworkAddress(): string {
    const interfaces = networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        const netList = interfaces[name];
        if (!netList) continue;
        for (const net of netList) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return 'localhost';
}

/**
 * Hosts the game application via local HTTP server (for singleplayer/client games)
 * or launches the multiplayer node server. Handles missing files gracefully.
 * @param pOptions - Host options.
 * @returns HostResult indicating success or failure message.
 */
export async function processHost(pOptions: HostOptions = {}): Promise<HostResult> {
    const cwd = process.cwd();
    const defaultPort = 8090;
    const port = pOptions.port || defaultPort;
    const distDir = pOptions.directory ? resolve(pOptions.directory) : join(cwd, 'dist');
    const architecture = detectArchitecture(join(cwd, 'src'));

    if (!existsSync(distDir)) {
        const message = `Target directory "${distDir}" does not exist. Run "kit build" or use "kit host -b" first.`;
        console.error(theme.error(`\n[Kit Host] ${message}\n`));
        return { success: false, message };
    }

    // Multiplayer Hosting
    if (architecture === 'multi') {
        const serverJsPath = join(distDir, 'server.js');
        if (!existsSync(serverJsPath)) {
            const message = `Cannot host multiplayer project: "${serverJsPath}" was not found. Please compile the server first using "kit build".`;
            console.error(theme.error(`\n[Kit Host] ${message}\n`));
            return { success: false, message };
        }

        console.log(`\n  ${theme.brandBold('Kit Multiplayer Server')} ${theme.muted('─')} ${theme.secondary(distDir)}\n`);

        let serverSettingsPort = port;
        const settingsPath = join(distDir, 'settings.json');
        if (existsSync(settingsPath)) {
            try {
                const settings = JSON.parse(readFileSync(settingsPath, 'utf8'));
                if (settings.port) serverSettingsPort = Number(settings.port);
            } catch {
                // Ignore fallback to default port
            }
        }

        const proc = Bun.spawn(['node', 'server.js'], {
            cwd: distDir,
            stdout: 'inherit',
            stderr: 'inherit',
            stdin: 'inherit'
        });

        console.log(`  ${theme.successIcon('✓')} ${theme.title('Multiplayer server process spawned')} ${theme.secondary(`(configured port: ${serverSettingsPort})`)}`);
        console.log(`  ${theme.title('Local:')}    ${theme.url(`http://localhost:${serverSettingsPort}`)}`);
        const lanIp = getNetworkAddress();
        if (lanIp !== 'localhost') {
            console.log(`  ${theme.title('Network:')}  ${theme.url(`http://${lanIp}:${serverSettingsPort}`)}`);
        }
        console.log(theme.muted('\n  Press Ctrl+C to stop the server\n'));

        process.on('SIGINT', () => {
            proc.kill();
            process.exit(0);
        });

        process.on('SIGTERM', () => {
            proc.kill();
            process.exit(0);
        });

        await proc.exited;
        return { success: true, message: 'Multiplayer server finished running.' };
    }

    // Singleplayer / Client static web hosting
    const indexPath = join(distDir, 'index.html');
    if (!existsSync(indexPath)) {
        const message = `Missing entrypoint: "${indexPath}" was not found in dist. Run "kit build" or use "kit host -b" to compile.`;
        console.error(theme.error(`\n[Kit Host] ${message}\n`));
        return { success: false, message };
    }

    const lanIp = getNetworkAddress();

    const server = Bun.serve({
        port,
        async fetch(pReq) {
            const path = new URL(pReq.url).pathname;
            const target = path === '/' ? '/index.html' : decodeURIComponent(path);
            const file = Bun.file(join(distDir, target));

            if (!await file.exists()) {
                if (pOptions.verbose) {
                    console.warn(theme.warning(`[Kit Host] 404 Not Found: ${target}`));
                }
                return new Response('Not Found', { status: 404 });
            }

            return new Response(file);
        }
    });

    console.log(`\n  ${theme.brandBold('Kit Game Host Server')}\n`);
    console.log(`  ${theme.title('Local:')}    ${theme.url(`http://localhost:${server.port}`)}`);
    if (lanIp !== 'localhost') {
        console.log(`  ${theme.title('Network:')}  ${theme.url(`http://${lanIp}:${server.port}`)}`);
    }
    console.log(theme.secondary(`\n  Serving files from: ${distDir}`));
    console.log(theme.muted('  Press Ctrl+C to stop the server\n'));

    process.on('SIGINT', () => {
        console.log(theme.warning('\nShutting down host server...'));
        server.stop();
        process.exit(0);
    });

    process.on('SIGTERM', () => {
        server.stop();
        process.exit(0);
    });

    return {
        success: true,
        message: `Serving files on port ${server.port}`,
        server: {
            stop: () => server.stop(),
            port: server.port
        }
    };
}
