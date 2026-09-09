#!/usr/bin/env node
import type { ProcessOptions } from '../src/cli/types';
import { Command } from 'commander';
import { KitCLI } from '../src/cli/main';
import chalk from 'chalk';
import packageJSON from '../package.json';

const program = new Command();

/**
 * Custom help information formatter that provides the Kit aesthetic.
 * @param pCmd - The command to generate help for.
 * @returns The formatted help string.
 */
const formatHelp = (pCmd: Command): string => {
    const isRoot = pCmd === program;
    const desc = pCmd.description() || packageJSON['cli-description'];
    
    // Header
    let output = `\n  ${chalk.cyan('Kit CLI')} ${chalk.dim('-')} ${chalk.white(desc)}\n`;
    output += `  ${chalk.gray('Version')} ${chalk.green(packageJSON.version)}\n\n`;
    
    // Usage
    const usage = pCmd.usage() || (isRoot ? `${chalk.dim('<command>')} ${chalk.dim('[options]')}` : `${chalk.dim('[options]')}`);
    output += `  ${chalk.white.bold('Usage:')} ${chalk.cyan('kit')} ${!isRoot ? chalk.cyan(pCmd.name() + ' ') : ''}${usage}\n\n`;

    // Commands (only for root)
    if (isRoot) {
        output += `  ${chalk.white.bold('Commands:')}\n`;
        pCmd.commands.filter(cmd => cmd.name() !== 'help').forEach(cmd => {
            output += `    ${chalk.green(cmd.name().padEnd(12))} ${chalk.dim(cmd.description())}\n`;
        });
        output += '\n';
    }

    // Options
    const options = pCmd.options.filter(opt => {
        // Hide version from root options as it's in the header
        if (isRoot && (opt.flags.includes('--version') || opt.flags.includes('-V'))) return false;
        // Hide help from subcommands as it's implied
        if (!isRoot && (opt.flags.includes('--help') || opt.flags.includes('-h'))) return false;
        return true;
    });

    if (options.length > 0) {
        output += `  ${chalk.white.bold(isRoot ? 'Options:' : 'Command Options:')}\n`;
        options.forEach(opt => {
            output += `    ${chalk.yellow(opt.flags.padEnd(20))} ${chalk.dim(opt.description)}\n`;
        });
        output += '\n';
    }

    // Global Options (for subcommands)
    if (!isRoot) {
        const globalOptions = program.options.filter(opt => {
            if (opt.flags.includes('--version') || opt.flags.includes('-V')) return false;
            return true;
        });
        if (globalOptions.length > 0) {
            output += `  ${chalk.white.bold('Global Options:')}\n`;
            globalOptions.forEach(opt => {
                output += `    ${chalk.yellow(opt.flags.padEnd(20))} ${chalk.dim(opt.description)}\n`;
            });
            output += '\n';
        }
    }

    // Examples
    const name = pCmd.name();
    if (isRoot || name === 'init' || name === 'build' || name === 'create' || name === 'doctor') {
        output += `  ${chalk.white.bold('Examples:')}\n`;
        if (isRoot || name === 'init') {
            output += `    ${chalk.cyan('kit init')}\n`;
            output += `    ${chalk.cyan('kit init my-game --single --install')}\n`;
        }
        if (isRoot || name === 'build') {
            output += `    ${chalk.cyan('kit build --in ./src/resources --out ./dist')}\n`;
            output += `    ${chalk.cyan('kit build --in ./src/resources --out ./dist --watch')}\n`;
        }
        if (isRoot || name === 'create') {
            output += `    ${chalk.cyan('kit create plugin Inventory')}\n`;
        }
        if (isRoot || name === 'doctor') {
            output += `    ${chalk.cyan('kit doctor')}\n`;
        }
        if (isRoot || name === 'host') {
            output += `    ${chalk.cyan('kit host')}\n`;
            output += `    ${chalk.cyan('kit host -p 8080 -b')}\n`;
        }
        if (isRoot) {
            output += `    ${chalk.cyan('kit build --help')}\n`;
        }
        output += '\n';
    }

    // Getting Help hint
    if (isRoot) {
        output += `  ${chalk.white('Tip:')} ${chalk.dim('Use ')}${chalk.cyan('kit <command> --help')}${chalk.dim(' or ')}${chalk.cyan('kit help <command>')}${chalk.dim(' to see specific options for any command.')}\n`;
    }

    return output;
};

program
  .name('kit')
  .version(`${packageJSON.version}`)
  .description(packageJSON['cli-description'])
  .option('-v, --verbose', 'Enable verbose mode for debugging', false);

// Apply custom help to root
program.helpInformation = () => formatHelp(program);

// Init Command
const initCommand = program
  .command('init [name]')
  .description('Initialize a new Kit project')
  .option('-s, --single', 'Quick-start a single player project')
  .option('-m, --multi', 'Quick-start a multiplayer project')
  .option('-f, --force', 'Force overwrite if destination already exists', false)
  .option('-i, --install', 'Automatically install dependencies using Bun', false)
  .action(async (pName, pCmdOptions) => {
      if (pName === 'help') {
          console.log(initCommand.helpInformation());
          return;
      }

      await KitCLI.init({
          projectName: pName,
          single: pCmdOptions.single,
          multi: pCmdOptions.multi,
          force: pCmdOptions.force,
          install: pCmdOptions.install,
          verbose: program.opts().verbose
      });
  });

// Apply custom help to init
initCommand.helpInformation = () => formatHelp(initCommand);

// Build Command
const buildCommand = program
  .command('build [help]')
  .description('Build resources and bundle game application')
  .option('-i, --in <path>', 'Input directory (defaults to ./src/resources)')
  .option('-o, --out <path>', 'Output directory (defaults to ./dist)')
  .option('-m, --manifest <path>', 'Custom manifest file path')
  .option('-w, --watch', 'Watch files for changes and rebuild automatically', false)
  .option('-is, --ignore-sound', 'Ignore sound files', false)
  .option('--app', 'Bundle game code and static assets (enabled by default when project entrypoints exist)')
  .option('--no-app', 'Disable game code bundling and only process resources')
  .option('-p, --prod', 'Production build: enables minification, identifier obfuscation, and strips sourcemaps', false)
  .option('--minify', 'Minify bundled JavaScript syntax, whitespace, and identifiers', false)
  .option('--obfuscate', 'Mangle and obfuscate variable and property identifiers', false)
  .option('--sourcemap <mode>', 'Sourcemap generation mode (none, linked, inline, external)')
  .action((pHelp, pCmdOptions) => {
      if (pHelp === 'help') {
          console.log(buildCommand.helpInformation());
          return;
      }

      const verbose = program.opts().verbose;

      const processOptions: ProcessOptions = {
          inDirectory: pCmdOptions.in,
          outDirectory: pCmdOptions.out,
          manifestPath: pCmdOptions.manifest,
          watch: pCmdOptions.watch || false,
          ignoreSound: pCmdOptions.ignoreSound || false,
          app: pCmdOptions.app,
          minify: pCmdOptions.minify || false,
          obfuscate: pCmdOptions.obfuscate || false,
          sourcemap: pCmdOptions.sourcemap,
          prod: pCmdOptions.prod || false,
          verbose: verbose || false,
      };

      KitCLI.processResources(processOptions);
  });

// Apply custom help to build
buildCommand.helpInformation = () => formatHelp(buildCommand);

// Create Command
const createCommand = program
  .command('create [type] [name]')
  .description('Generate boilerplate files (e.g. plugin)')
  .action(async (pType, pName) => {
      if (pType === 'help' || !pType || !pName) {
          console.log(createCommand.helpInformation());
          return;
      }

      await KitCLI.create({
          type: pType,
          name: pName,
          verbose: program.opts().verbose
      });
  });

// Apply custom help to create
createCommand.helpInformation = () => formatHelp(createCommand);

// Doctor Command
const doctorCommand = program
  .command('doctor')
  .description('Inspect environment and game project diagnostics')
  .action(async () => {
      const allPassed = await KitCLI.doctor({
          verbose: program.opts().verbose
      });

      if (!allPassed) {
          process.exitCode = 1;
      }
  });

// Apply custom help to doctor
doctorCommand.helpInformation = () => formatHelp(doctorCommand);

// Host Command
const hostCommand = program
  .command('host')
  .description('Host the game application locally')
  .option('-p, --port <number>', 'Port to run host server on (default: 8090)', '8090')
  .option('-d, --dir <path>', 'Directory to serve (default: ./dist)')
  .option('-b, --build', 'Build the project before hosting', false)
  .action(async (pCmdOptions) => {
      const verbose = program.opts().verbose;
      if (pCmdOptions.build) {
          await KitCLI.processResources({ verbose });
      }
      const result = await KitCLI.host({
          port: Number(pCmdOptions.port) || 8090,
          directory: pCmdOptions.dir,
          verbose
      });

      if (!result.success) {
          process.exitCode = 1;
      }
  });

// Apply custom help to host
hostCommand.helpInformation = () => formatHelp(hostCommand);

// Explicit help command
program
  .command('help [command]')
  .description('Display help for a command')
  .action((pCommandName) => {
      if (pCommandName) {
          const cmd = program.commands.find(c => c.name() === pCommandName);
          if (cmd) {
              console.log(cmd.helpInformation());
          } else {
              console.error(chalk.red(`Unknown command: ${pCommandName}`));
              program.help();
          }
      } else {
          program.help();
      }
  });

// Display help if no arguments provided
if (!process.argv.slice(2).length) {
    program.help();
}

program.parse(process.argv);

