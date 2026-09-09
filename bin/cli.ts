#!/usr/bin/env node
import type { ProcessOptions } from '../src/cli/types';
import { Command } from 'commander';
import { KitCLI } from '../src/cli/main';
import chalk from 'chalk';
import packageJSON from '../package.json';
import { theme } from '../src/cli/theme';

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
    let output = `\n  ${theme.brandBold('Kit CLI')} ${theme.muted('─')} ${theme.title(desc)}\n`;
    output += `  ${theme.secondary('Version')} ${theme.brandBold(`v${packageJSON.version}`)}\n\n`;
    
    // Usage
    const usage = pCmd.usage() || (isRoot ? `${theme.secondary('<command>')} ${theme.muted('[options]')}` : `${theme.muted('[options]')}`);
    output += `  ${theme.title('Usage:')} ${theme.brandBold('kit')} ${!isRoot ? theme.brand(pCmd.name() + ' ') : ''}${usage}\n\n`;

    // Commands (only for root)
    if (isRoot) {
        output += `  ${theme.title('Commands:')}\n`;
        pCmd.commands.filter(cmd => cmd.name() !== 'help').forEach(cmd => {
            output += `    ${theme.brandBold(cmd.name().padEnd(14))} ${theme.secondary(cmd.description())}\n`;
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
        output += `  ${theme.title(isRoot ? 'Options:' : 'Command Options:')}\n`;
        options.forEach(opt => {
            output += `    ${theme.warningMuted(opt.flags.padEnd(24))} ${theme.secondary(opt.description)}\n`;
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
            output += `  ${theme.title('Global Options:')}\n`;
            globalOptions.forEach(opt => {
                output += `    ${theme.warningMuted(opt.flags.padEnd(24))} ${theme.secondary(opt.description)}\n`;
            });
            output += '\n';
        }
    }

    // Examples
    const name = pCmd.name();
    if (isRoot || name === 'init' || name === 'build' || name === 'create' || name === 'doctor') {
        output += `  ${theme.title('Examples:')}\n`;
        if (isRoot || name === 'init') {
            output += `    ${theme.brand('kit init')}\n`;
            output += `    ${theme.brand('kit init my-game --single --install')}\n`;
        }
        if (isRoot || name === 'build') {
            output += `    ${theme.brand('kit build --in ./src/resources --out ./dist')}\n`;
            output += `    ${theme.brand('kit build --in ./src/resources --out ./dist --watch')}\n`;
        }
        if (isRoot || name === 'create') {
            output += `    ${theme.brand('kit create plugin Inventory')}\n`;
        }
        if (isRoot || name === 'doctor') {
            output += `    ${theme.brand('kit doctor')}\n`;
        }
        if (isRoot || name === 'host') {
            output += `    ${theme.brand('kit host')}\n`;
            output += `    ${theme.brand('kit host -p 8080 -b')}\n`;
        }
        if (isRoot) {
            output += `    ${theme.brand('kit build --help')}\n`;
        }
        output += '\n';
    }

    // Getting Help hint
    if (isRoot) {
        output += `  ${theme.accent('Tip:')} ${theme.secondary('Use ')}${theme.brandBold('kit <command> --help')}${theme.secondary(' to view detailed options for any command.')}\n`;
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

