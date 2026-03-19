import CopyBunPlugin from '@evitcastudio/copy-bun-plugin';
import Bun from 'bun';
import chalk from 'chalk';

export const logMessage = (pLevel: string, pMessage: string): void => {
  const colors:  Record<string, string> = { error: '#c42847', info: '#ffa552' };
  const levelFormatted = pLevel.charAt(0).toUpperCase() + pLevel.slice(1);
  const color = colors[pLevel] || '#ffa552';
  console.log(chalk.hex(color)(`[Builder][${levelFormatted}]`), `${pMessage}`);
};

if (import.meta.main) {
    const startStamp = Date.now();

    await Bun.build({
        entrypoints: ['./src/index.ts'],
        naming: 'index.js',
        outdir: './dist',
        plugins: [
            CopyBunPlugin({
                verbose: true,
                resources: [
                    { src: './src/**/*.{html,css}', dst: 'dist/' },
                    { src: './favicon.ico', dst: 'dist/' },
                    { src: './src/vendor/vylocity-game-engine/vylo.client.js', dst: 'dist/vendor/vylocity-game-engine/' },
                ]
            })
        ]
    });

    const clientBuildTime = Date.now() - startStamp;
    logMessage('info', `Client Build took: ${clientBuildTime}ms`);
}
