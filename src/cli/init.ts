import { intro, outro, text, select, confirm, spinner, note, isCancel, cancel } from '@clack/prompts';
import chalk from 'chalk';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync, execSync } from 'node:child_process';
import os from 'node:os';
import packageJSON from '../../package.json';

/**
 * Options for the init command.
 */
export interface InitOptions {
    projectName?: string;
    single?: boolean;
    multi?: boolean;
    force?: boolean;
    install?: boolean;
    verbose?: boolean;
}

/**
 * Gets the git user name and email from the local system.
 * @returns The formatted author string.
 */
function getGitUser(): string {
    try {
        const name = spawnSync('git', ['config', '--get', 'user.name'], { encoding: 'utf8' }).stdout.trim();
        const email = spawnSync('git', ['config', '--get', 'user.email'], { encoding: 'utf8' }).stdout.trim();
        
        if (name && email) {
            return `${name} <${email}>`;
        }
        
        return name || 'Author';
    } catch {
        return 'Author';
    }
}

function checkBun(): boolean {
    const result = spawnSync('bun', ['--version'], { stdio: 'ignore', shell: true });
    return !result.error && result.status === 0;
}

/**
 * Installs Bun using the official installation scripts.
 * @returns True if the installation was successful.
 */
function installBun(): boolean {
    const isWindows = os.platform() === 'win32';
    const command = isWindows 
        ? 'powershell -c "irm bun.sh/install.ps1 | iex"' 
        : 'curl -fsSL https://bun.sh/install | bash';

    try {
        execSync(command, { stdio: 'inherit' });
        return true;
    } catch {
        return false;
    }
}

/**
 * Recursively copy template files and replace placeholders.
 * @param pSrc - Source template directory.
 * @param pDest - Destination project directory.
 * @param pProjectName - Project name for placeholder replacement.
 * @param pVersion - Version number for placeholder replacement.
 * @param pAuthor - Author for placeholder replacement.
 */
function copyTemplate(pSrc: string, pDest: string, pProjectName: string, pVersion: string, pAuthor: string): void {
    if (!fs.existsSync(pDest)) {
        fs.mkdirSync(pDest, { recursive: true });
    }

    const files = fs.readdirSync(pSrc);

    for (const file of files) {
        const srcPath = path.join(pSrc, file);
        // Rename _gitignore back to .gitignore in the destination
        const destFile = file === '_gitignore' ? '.gitignore' : file;
        const destPath = path.join(pDest, destFile);
        const stats = fs.statSync(srcPath);

        if (stats.isDirectory()) {
            if (file === '.git') continue; // Do not copy .git directories
            copyTemplate(srcPath, destPath, pProjectName, pVersion, pAuthor);
        } else {
            const ext = path.extname(file).toLowerCase();
            const textExtensions = ['.ts', '.js', '.json', '.html', '.css', '.md', '.txt'];
            
            if (textExtensions.includes(ext)) {
                let content = fs.readFileSync(srcPath, 'utf8');
                // Replace placeholders
                content = content.replace(/{{PROJECT_NAME}}/g, pProjectName);
                content = content.replace(/{{VERSION}}/g, pVersion);
                content = content.replace(/{{PROJECT_AUTHOR}}/g, pAuthor);
                
                fs.writeFileSync(destPath, content);
            } else {
                // Binary-safe copy for other files (like .vyi, images, etc.)
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }
}

/**
 * Process the initialization of a new project.
 * @param pOptions - Options for initialization.
 */
export async function processInit(pOptions: InitOptions): Promise<void> {
    intro(chalk.cyan(`Kit CLI v${packageJSON.version}`));

    // Environment Check
    if (!checkBun()) {
        note(`Kit requires the Bun runtime to build and run projects.\nYou can download it manually at ${chalk.cyan('https://bun.sh/')}`, 'Bun Not Found');

        const install = await confirm({
            message: 'Would you like to install Bun automatically now?',
            initialValue: true,
        });

        if (isCancel(install) || !install) {
            cancel(`Please install Bun manually to use Kit: ${chalk.cyan('https://bun.sh/')}\nNote: Kit projects cannot build or run without Bun.`);
            process.exit(1);
        }

        const sInstall = spinner();
        sInstall.start('Installing Bun...');
        const success = installBun();
        
        if (!success) {
            sInstall.stop(chalk.red('Automatic installation failed.'));
            note(`Please install Bun manually: ${chalk.cyan('https://bun.sh/')}`, 'Manual Installation Required');
            process.exit(1);
        }
        sInstall.stop();
    }

    let projectName = pOptions.projectName;
    let gameType: 'single' | 'multi' | 'both' = 'single';
    let shouldInstall = Boolean(pOptions.install);
    const isInteractive = !pOptions.single && !pOptions.multi && !projectName;

    // Interactive Walkthrough
    if (isInteractive) {
        const name = await text({
            message: 'What is the name of your project?',
            placeholder: 'my-amazing-project',
            validate(pValue: string | undefined) {
                if (!pValue || pValue.length === 0) return 'Project name is required';
                if (!/^[a-z0-9-_]+$/i.test(pValue)) return 'Project name must be alphanumeric with dashes or underscores';
            },
        });

        if (isCancel(name)) {
            cancel('Operation cancelled.');
            process.exit(0);
        }
        projectName = name as string;

        const type = await select({
            message: 'What type of game are you building?',
            options: [
                { value: 'single', label: 'Single Player', hint: 'Legacy of Goku, Chrono Trigger, Final Fantasy, etc.' },
                { value: 'multi', label: 'Multiplayer', hint: 'APEX Legends, DBZ Squadra, Valorant, etc.' },
                { value: 'both', label: 'Single & Multiplayer', hint: 'Minecraft, Terraria, etc.' },
            ],
        });

        if (isCancel(type)) {
            cancel('Operation cancelled.');
            process.exit(0);
        }
        gameType = type as 'single' | 'multi' | 'both';

        const installChoice = await confirm({
            message: 'Install dependencies with Bun now?',
            initialValue: true,
        });

        if (!isCancel(installChoice)) {
            shouldInstall = Boolean(installChoice);
        }
    } else {
        // Handle flags
        if (pOptions.single) gameType = 'single';
        if (pOptions.multi) gameType = 'multi';
        if (pOptions.single && pOptions.multi) gameType = 'both';
        if (!projectName) projectName = 'kit-project';
    }

    const projectDir = path.join(process.cwd(), projectName);

    if (fs.existsSync(projectDir)) {
        if (isInteractive) {
            const overwrite = await confirm({
                message: `Directory ${chalk.cyan(projectName)} already exists. Overwrite?`,
                initialValue: false,
            });

            if (isCancel(overwrite) || !overwrite) {
                cancel('Installation aborted.');
                process.exit(0);
            }
        } else if (!pOptions.force) {
            console.error(chalk.red(`\nError: Destination directory '${projectName}' already exists. Use --force (-f) to overwrite.`));
            process.exit(1);
        }
    }

    const s = spinner();
    s.start(`Scaffolding ${chalk.cyan(projectName)}...`);

    try {
        const projectPath = path.join(process.cwd(), projectName);
        
        if (fs.existsSync(projectPath)) {
            fs.rmSync(projectPath, { recursive: true, force: true });
        }

        fs.mkdirSync(projectPath, { recursive: true });

        // Determine the template type based on gameType
        let templateType: string = gameType;
        if (gameType === 'both') templateType = 'multi'; // Use multi for both for now

        // Resolve template path
        const templatesDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'kit-game-templates', templateType);
        const author = getGitUser();

        if (!fs.existsSync(templatesDir)) {
            const localTemplatesDir = path.join(process.cwd(), 'kit-game-templates', templateType);
            if (!fs.existsSync(localTemplatesDir)) {
                console.error(chalk.red(`Error: Templates not found at ${templatesDir} or ${localTemplatesDir}`));
                process.exit(1);
            }
            copyTemplate(localTemplatesDir, projectPath, projectName, packageJSON.version, author);
        } else {
            copyTemplate(templatesDir, projectPath, projectName, packageJSON.version, author);
        }

        // Initialize git and create initial commit
        try {
            spawnSync('git', ['init'], { cwd: projectPath });
            spawnSync('git', ['add', '.'], { cwd: projectPath });
            spawnSync('git', ['commit', '-m', 'Initial commit from Kit CLI'], { 
                cwd: projectPath,
                env: { ...process.env, GIT_AUTHOR_NAME: author.split(' <')[0], GIT_AUTHOR_EMAIL: author.split('<')[1]?.slice(0, -1) || '' }
            });
        } catch {
            // Silently fail if git is not installed or config is missing 
        }

        s.stop(`Project ${chalk.green(projectName)} created!`);

        // Automatically install dependencies if requested
        if (shouldInstall) {
            const installSpinner = spinner();
            installSpinner.start('Installing project dependencies with Bun...');
            const installResult = spawnSync('bun', ['install'], { cwd: projectPath, stdio: 'ignore', shell: true });
            if (installResult.status === 0) {
                installSpinner.stop(chalk.green('Dependencies installed successfully!'));
            } else {
                installSpinner.stop(chalk.yellow('Dependency installation finished with warnings.'));
            }
        }

        console.log(`${chalk.cyan('│')}`);
        console.log(`${chalk.cyan('│')}  ${chalk.white.bold('Next steps:')}`);
        console.log(`${chalk.cyan('│')}  ${chalk.dim('1.')} cd ${chalk.cyan(projectName)}`);
        if (!shouldInstall) {
            console.log(`${chalk.cyan('│')}  ${chalk.dim('2.')} bun install`);
            console.log(`${chalk.cyan('│')}  ${chalk.dim('3.')} bun run build`);
        } else {
            console.log(`${chalk.cyan('│')}  ${chalk.dim('2.')} bun run build`);
        }
        console.log(`${chalk.cyan('│')}`);

        outro(chalk.green.bold('Happy coding!'));
    } catch (pError: unknown) {
        s.stop(chalk.red('Scaffolding failed.'));
        
        // Cleanup partially created directory
        if (projectName) {
            const projectPath = path.join(process.cwd(), projectName);
            if (fs.existsSync(projectPath)) {
                fs.rmSync(projectPath, { recursive: true, force: true });
            }
        }

        console.error(pError);
        process.exit(1);
    }
}
