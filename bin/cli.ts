import { Command } from 'commander';
import { KitCLI } from './kit';
import { BuildOptions } from './types/shared-types';
import packageJSON from '../package.json';

const program = new Command();

program
  .version(`${packageJSON.version}`)
  .description(`Kit - ${packageJSON['cli-description']}`);

program
  .option('-i, --in <path>', 'Input directory')
  .option('-o, --out <path>', 'Output directory')
  .option('-r, --resource-path <path>', 'Path to the resources')
  .option('-is, --ignore-sound', 'Ignore sound files', false)
  .option('-v, --verbose', 'Enable verbose mode', false);

program.helpInformation = () => {
    return `
Kit CLI - ${packageJSON['cli-description']}
Version: ${packageJSON.version}

Usage: kit <command> [options]

Commands:
build                    Build resources from the specified directory
--help                   Display this help message

Options:
-i, --in <path>          Input directory (required)
-o, --out <path>         Output directory (required)
-r, --resource-path <path>   Path to the resources
-is, --ignore-sound           Ignore sound files (optional)
-v, --verbose                Enable verbose mode for debugging

Examples:
kit build --in ./src --out ./dist --verbose
kit build --in ./resources --out ./dist/resources --ignore-sound
`;
};

// Display help if no command is provided
if (!process.argv.slice(2).length) {
    program.help();
}

// Build Command
program
  .command('build')
  .description('Build resources from the specified directory')
  .action(() => {
      const flags = program.opts();

      if (!flags.in || !flags.out) {
          console.error('Error: --in and --out are required flags for the build command.');
          process.exit(1);
      }

      const buildOptions: BuildOptions = {
          inDirectory: flags.in,
          outDirectory: flags.out,
          resourcePath: flags.resourcePath || '.',
          ignoreSound: flags.ignoreSound || false,
          verbose: flags.verbose || false,
      };

      KitCLI.buildResources(buildOptions);
  });

program.parse(process.argv);


