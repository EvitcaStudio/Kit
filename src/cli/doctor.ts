import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import chalk from 'chalk';

export interface DoctorOptions {
    verbose?: boolean;
}

interface DiagnosticResult {
    category: string;
    title: string;
    passed: boolean;
    details?: string;
}

/**
 * Runs diagnostics on the local development environment and project health.
 * @param pOptions - Options passed from the CLI.
 */
export async function processDoctor(pOptions: DoctorOptions = {}): Promise<boolean> {
    const isVerbose = Boolean(pOptions.verbose);
    const results: DiagnosticResult[] = [];

    console.log(`\n  ${chalk.cyan.bold('Kit Doctor')} ${chalk.dim('-')} Environment & Project Health Check\n`);

    // 1. Runtime Check: Bun
    const bunCheck = spawnSync('bun', ['--version'], { encoding: 'utf8', shell: true });
    if (!bunCheck.error && bunCheck.status === 0) {
        results.push({
            category: 'Runtime',
            title: 'Bun Runtime',
            passed: true,
            details: `Installed version v${bunCheck.stdout.trim()}`
        });
    } else {
        results.push({
            category: 'Runtime',
            title: 'Bun Runtime',
            passed: false,
            details: 'Bun is not installed or not in PATH. Download at https://bun.sh/'
        });
    }

    // 2. Version Control Check: Git
    const gitCheck = spawnSync('git', ['--version'], { encoding: 'utf8', shell: true });
    if (!gitCheck.error && gitCheck.status === 0) {
        results.push({
            category: 'VCS',
            title: 'Git Installation',
            passed: true,
            details: gitCheck.stdout.trim()
        });
    } else {
        results.push({
            category: 'VCS',
            title: 'Git Installation',
            passed: false,
            details: 'Git was not found in your PATH.'
        });
    }

    // 3. Project Environment Check
    const cwd = process.cwd();
    const pkgPath = join(cwd, 'package.json');
    const hasPackageJson = existsSync(pkgPath);

    if (hasPackageJson) {
        try {
            const rawPkg = readFileSync(pkgPath, 'utf8');
            const pkg = JSON.parse(rawPkg);
            const hasKitDependency = Boolean(
                (pkg.dependencies && pkg.dependencies['@evitcastudio/kit']) ||
                (pkg.devDependencies && pkg.devDependencies['@evitcastudio/kit']) ||
                pkg.name === '@evitcastudio/kit'
            );

            results.push({
                category: 'Project',
                title: 'package.json configuration',
                passed: true,
                details: `Project name: ${pkg.name || 'unnamed'}`
            });

            results.push({
                category: 'Project',
                title: 'Kit framework dependency',
                passed: hasKitDependency,
                details: hasKitDependency
                    ? 'Found @evitcastudio/kit in project configuration'
                    : 'Missing @evitcastudio/kit dependency in package.json'
            });

            // If running inside a consumer game project, check game asset directory structure
            const isKitCoreRepo = pkg.name === '@evitcastudio/kit';
            if (!isKitCoreRepo) {
                const resourcesDir = join(cwd, 'src', 'resources');
                const hasResources = existsSync(resourcesDir);
                results.push({
                    category: 'Project',
                    title: 'Asset Directory (src/resources)',
                    passed: hasResources,
                    details: hasResources ? 'Asset directory present' : 'src/resources not found'
                });
            }
            // Detect project type (multiplayer vs single-player)
            const hasClientEntry = existsSync(join(cwd, 'src', 'client', 'index.ts'));
            const hasServerEntry = existsSync(join(cwd, 'src', 'server', 'index.ts'));
            const hasSingleEntry = existsSync(join(cwd, 'src', 'index.ts'));

            let projectType = 'Unknown';
            if (hasClientEntry && hasServerEntry) {
                projectType = 'Multiplayer (Client & Server)';
            } else if (hasClientEntry) {
                projectType = 'Multiplayer (Client)';
            } else if (hasServerEntry) {
                projectType = 'Dedicated Server';
            } else if (hasSingleEntry) {
                projectType = 'Singleplayer';
            }

            results.push({
                category: 'Project',
                title: 'Project Architecture',
                passed: projectType !== 'Unknown' || isKitCoreRepo,
                details: isKitCoreRepo ? 'Kit Core Framework Repository' : `Detected Type: ${projectType}`
            });
        } catch {
            results.push({
                category: 'Project',
                title: 'package.json format',
                passed: false,
                details: 'package.json is malformed or invalid JSON'
            });
        }

        // Check for build script: either bun-build.ts exists, or package.json has a build script using kit build
        const buildScript = join(cwd, 'bun-build.ts');
        const hasBuildScript = existsSync(buildScript);
        let hasKitBuildScript = false;
        try {
            const rawPkg = readFileSync(pkgPath, 'utf8');
            const pkg = JSON.parse(rawPkg);
            if (pkg.scripts && typeof pkg.scripts.build === 'string' && pkg.scripts.build.includes('kit build')) {
                hasKitBuildScript = true;
            }
        } catch {
            // Ignored, handled above
        }

        const buildPipelinePassed = hasBuildScript || hasKitBuildScript;
        let buildDetails = 'No build pipeline configured';
        if (hasKitBuildScript && hasBuildScript) {
            buildDetails = 'Kit CLI build pipeline with bun-build.ts present';
        } else if (hasKitBuildScript) {
            buildDetails = 'Kit CLI native build pipeline configured';
        } else if (hasBuildScript) {
            buildDetails = 'Legacy bun-build.ts present';
        }

        results.push({
            category: 'Project',
            title: 'Build Pipeline',
            passed: buildPipelinePassed,
            details: buildDetails
        });
    } else {
        results.push({
            category: 'Project',
            title: 'Project Context',
            passed: true,
            details: 'Not currently executed inside a Node/Bun project root.'
        });
    }

    // Render results
    let allPassed = true;
    for (const res of results) {
        const icon = res.passed ? chalk.green('✓') : chalk.red('✗');
        const titleText = res.passed ? chalk.white(res.title) : chalk.red.bold(res.title);
        console.log(`  ${icon} [${chalk.cyan(res.category)}] ${titleText}`);
        if (res.details && (!res.passed || isVerbose)) {
            console.log(`    ${chalk.dim(res.details)}`);
        }
        if (!res.passed) {
            allPassed = false;
        }
    }

    console.log('\n');
    if (allPassed) {
        console.log(`  ${chalk.green.bold('All doctor diagnostics passed!')}\n`);
    } else {
        console.log(`  ${chalk.yellow.bold('Some issues were detected. Check the items above.')}\n`);
    }

    return allPassed;
}
