import Bun from 'bun';
import type { BunPlugin } from 'bun';
import CopyBunPlugin from '@evitcastudio/copy-bun-plugin';
import chalk from 'chalk';

import packageJson from './package.json';

const banner = [
  `/*!`,
  ` * ${packageJson.name}@${packageJson.version}`,
  ` * Compiled ${new Date().toUTCString().replace(/GMT/g, 'UTC')}`,
  ` *`,
  ` * ${packageJson.name} is privately licensed. All rights reserved.`,
  ` * Author: ${packageJson.author ?? 'Unnamed'}`,
  ` */`,
].join('\n');

type BuildOptions = {
  entries: string[],
  outDir: string,
  outName: string,
  banner?: boolean,
  minify?: boolean,
  sourceMap?: 'none' | 'linked' | 'inline' | 'external' | undefined,
  plugins?: BunPlugin[],
  target: 'browser' | 'bun' | 'node' | undefined
}

export const logMessage = (pLevel: string, pMessage: string): void => {
  const colors:  Record<string, string> = { error: '#c42847', info: '#ffa552' };
  const levelFormatted = pLevel.charAt(0).toUpperCase() + pLevel.slice(1);
  const color = colors[pLevel] || '#ffa552';
  console.log(chalk.hex(color)(`[Builder][${levelFormatted}]`), `${pMessage}`);
};

const build = async(pBuildOptions: BuildOptions): Promise<number> => {
  const startStamp = Date.now();
  const result = await Bun.build({
    entrypoints: pBuildOptions.entries,
    outdir: pBuildOptions.outDir,
    minify: {
      identifiers: pBuildOptions.minify,
      syntax: pBuildOptions.minify,
      whitespace: pBuildOptions.minify
    },
    sourcemap: pBuildOptions.sourceMap,
    naming: pBuildOptions.outName,
    target: pBuildOptions.target,
    plugins: pBuildOptions.plugins,
    banner: banner
  });

  if (!result.success) {
    logMessage('error', `Build failed.`);
    console.error(result);
    throw new AggregateError(result.logs, 'Build failed');
  }

  const elapsed = Date.now() - startStamp;
  return elapsed;
}

export const buildEnvs = async () => {
    const [ clientBuildTime, serverBuildTime ] = await Promise.all([
    // Client build
    build({
      entries: ['./src/client/index.ts'],
      outDir: './dist',
      outName: 'index.js',
      minify: true,
      banner: true,
      // sourceMap: 'linked',
      target: 'browser',
      plugins: [
        CopyBunPlugin({
          verbose: true,
          resources: [
            { src: './src/client/**/*.{html,css}', dst: 'dist/' },
            { src: './favicon.ico', dst: 'dist/' },
            { src: './src/client/vendor/vylocity-game-engine/vylo.client.js', dst: 'dist/vendor/vylocity-game-engine/' },
          ]
        })
      ]
    }),
    // Server build
    build({
      entries: ['./src/server/index.ts'],
      outDir: './dist',
      outName: 'server.js',
      banner: true,
      target: 'node',
      plugins: [
        CopyBunPlugin({
          verbose: true,
          resources: [
            { src: './src/server/settings.json', dst: 'dist/' },
          ]
        })
      ]
    })
  ]);

  logMessage('info', `Client Build took: ${clientBuildTime}ms`);
  logMessage('info', `Server Build took: ${serverBuildTime}ms`);
}

if (import.meta.main) {
  await buildEnvs();
}