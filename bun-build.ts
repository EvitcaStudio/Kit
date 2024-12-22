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
    const colors = { error: '#c42847', info: '#ffa552' };
    const levelFormatted = pLevel.charAt(0).toUpperCase() + pLevel.slice(1);
    const color = colors[pLevel] || '#ffa552';
    console.log(chalk.hex(color)(`[${levelFormatted}]`), `${pMessage}`);
};

const oldNow = Date.now();

await Promise.all([
    // Natural version
    Bun.build({
        entrypoints: ['./src/index.ts'],
        outdir: './dist/bundle',
        naming: 'kit.js',
        minify: false,
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
    })
]);

const elapsed = Date.now() - oldNow;

logMessage('info', `Client Build took: ${elapsed}ms`);