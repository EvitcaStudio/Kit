import Bun from 'bun';
import chalk from 'chalk';
import packageJson from './package.json';

const banner = [
  `/*!`,
  ` * ${packageJson.name}@${packageJson.version} ${packageJson.repository.url}`,
  ` * Compiled ${new Date().toUTCString().replace(/GMT/g, 'UTC')}`,
  ` * Copyright (c) ${new Date().getFullYear()} Jared Bates, Evitca Studio, "doubleactii"`,
  ` *`,
  ` * ${packageJson.name} is licensed under the MIT License.`,
  ` * http://www.opensource.org/licenses/mit-license`,
  ` */`,
].join('\n');


function logMessage(pLevel: string, pMessage: string): void {
    const colors: Record<string, string> = { error: '#c42847', info: '#ffa552' };
    const levelFormatted = pLevel.charAt(0).toUpperCase() + pLevel.slice(1);
    const color = colors[pLevel] || '#ffa552';
    console.log(chalk.hex(color)(`[${levelFormatted}]`), `${pMessage}`);
};

const startStamp = Date.now();

await Promise.all([
    // Natural version
    Bun.build({
        entrypoints: ['./src/index.ts'],
        outdir: './dist/bundle',
        naming: 'kit.js',
        banner: banner,
        target: 'browser'
    }),
    // Minified version
    Bun.build({
        entrypoints: ['./src/index.ts'],
        outdir: './dist/bundle/min',
        naming: 'kit.min.js',
        minify: true,
        banner: banner,
        target: 'browser'
    }),
    // CLI version
    Bun.build({
        entrypoints: ['./bin/cli.ts'],
        outdir: './lib/bundle/cli',
        naming: 'cli.js',
        banner: banner,
        target: 'bun'
    })
]);

const buildElapsed = Date.now() - startStamp;
logMessage('info', `Build took: ${buildElapsed}ms`);

// Post-build: Ensure shebang on CLI
const cliPath = './lib/bundle/cli/cli.js';
const cliFile = Bun.file(cliPath);
if (await cliFile.exists()) {
    const content = await cliFile.text();
    const shebang = '#!/usr/bin/env bun\n';
    if (!content.startsWith(shebang)) {
        const cleanContent = content.replace(/^#!\/usr\/bin\/env (node|bun)\r?\n/, '');
        await Bun.write(cliPath, shebang + cleanContent);
        logMessage('info', 'Shebang prepended to CLI bundle.');
    } else {
        logMessage('info', 'Shebang already prepended to CLI bundle.');
    }
}

// Copy templates to build directory
const templatesSrc = './kit-game-templates';
const templatesDest = './lib/bundle/cli/';
const templatesTarget = './lib/bundle/cli/kit-game-templates';
// Purge the target directory first to avoid merging with old templates
await Bun.spawn(['shx', 'rm', '-rf', templatesTarget]).exited;
await Bun.spawn(['shx', 'cp', '-r', templatesSrc, templatesDest]).exited;
logMessage('info', 'Game templates copied to CLI bundle directory.');

// Ensure lib/cli-runner.cjs exists
const runnerContent = [
    '#!/usr/bin/env node',
    "const { spawnSync } = require('child_process');",
    "const path = require('path');",
    '',
    '// Target the compiled Bun bundle',
    "const cliScript = path.join(__dirname, 'bundle', 'cli', 'cli.js');",
    '',
    '// If currently running under Bun, import and execute directly',
    "if (typeof Bun !== 'undefined') {",
    '    import(cliScript);',
    '} else {',
    '    // Running under Node.js -> delegate to Bun runtime',
    "    const result = spawnSync('bun', [cliScript, ...process.argv.slice(2)], {",
    "        stdio: 'inherit',",
    "        shell: process.platform === 'win32'",
    '    });',
    '    process.exit(result.status ?? 0);',
    '}',
    ''
].join('\n');
await Bun.write('./lib/cli-runner.cjs', runnerContent);
await Bun.spawn(['chmod', '+x', './lib/cli-runner.cjs']).exited;
logMessage('info', 'CLI runner proxy written to lib/cli-runner.cjs.');