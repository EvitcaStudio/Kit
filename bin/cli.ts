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
    if (isRoot || name === 'init' || name === 'build') {
        output += `  ${chalk.white.bold('Examples:')}\n`;
        if (isRoot || name === 'init') {
            output += `    ${chalk.cyan('kit init')}\n`;
            output += `    ${chalk.cyan('kit init my-game --single')}\n`;
        }
        if (isRoot || name === 'build') {
            output += `    ${chalk.cyan('kit build --in ./src --out ./dist')}\n`;
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
  .name('cli') // commander uses name in usage
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
  .action(async (pName, pCmdOptions) => {
      if (pName === 'help') {
          console.log(initCommand.helpInformation());
          return;
      }

      await KitCLI.init({
          projectName: pName,
          single: pCmdOptions.single,
          multi: pCmdOptions.multi,
          verbose: program.opts().verbose
      });
  });

// Apply custom help to init
initCommand.helpInformation = () => formatHelp(initCommand);

// Build Command
const buildCommand = program
  .command('build [help]')
  .description('Build resources from the specified directory')
  .option('-i, --in <path>', 'Input directory (required)')
  .option('-o, --out <path>', 'Output directory (required)')
  .option('-is, --ignore-sound', 'Ignore sound files', false)
  .action((pHelp, pCmdOptions) => {
      if (pHelp === 'help') {
          console.log(buildCommand.helpInformation());
          return;
      }

      const verbose = program.opts().verbose;

      if (!pCmdOptions.in || !pCmdOptions.out) {
          console.error(chalk.red('\n  Error: --in and --out are required flags for the build command.'));
          console.log(buildCommand.helpInformation());
          process.exit(1);
      }

      const processOptions: ProcessOptions = {
          inDirectory: pCmdOptions.in,
          outDirectory: pCmdOptions.out,
          ignoreSound: pCmdOptions.ignoreSound || false,
          verbose: verbose || false,
      };

      KitCLI.processResources(processOptions);
  });

// Apply custom help to build
buildCommand.helpInformation = () => formatHelp(buildCommand);

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
