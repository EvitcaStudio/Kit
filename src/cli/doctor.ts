import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import chalk from 'chalk';
import { theme } from './theme';

export interface DoctorOptions {
    verbose?: boolean;
}

interface DiagnosticResult {
    category: string;
    title: string;
    passed: boolean;
    details?: string;
    alwaysShowDetails?: boolean;
}

/**
 * Runs diagnostics on the local development environment and project health.
 * @param pOptions - Options passed from the CLI.
 */
export async function processDoctor(pOptions: DoctorOptions = {}): Promise<boolean> {
    const isVerbose = Boolean(pOptions.verbose);
    const results: DiagnosticResult[] = [];

    console.log(`\n  ${theme.brandBold('Kit Doctor')} ${chalk.dim('-')} Environment & Project Health Check\n`);

    // 1. Runtime Check: Bun
    if (typeof Bun !== 'undefined') {
        results.push({
            category: 'Runtime',
            title: 'Bun Runtime',
            passed: true,
            details: `v${Bun.version}`
        });
    } else {
        const bunCheck = spawnSync('bun', ['--version'], { encoding: 'utf8', shell: true });
        if (!bunCheck.error && bunCheck.status === 0) {
            results.push({
                category: 'Runtime',
                title: 'Bun Runtime',
                passed: true,
                details: `v${bunCheck.stdout.trim()}`
            });
        } else {
            results.push({
                category: 'Runtime',
                title: 'Bun Runtime',
                passed: false,
                details: 'Bun is not installed or not in PATH. Download at https://bun.sh/'
            });
        }
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
            const isKitCoreRepo = pkg.name === '@evitcastudio/kit';
            const kitVersionSpec =
                pkg.dependencies?.['@evitcastudio/kit'] ||
                pkg.devDependencies?.['@evitcastudio/kit'];
            const hasKitDependency = Boolean(kitVersionSpec || isKitCoreRepo);

            results.push({
                category: 'Project',
                title: 'package.json configuration',
                passed: true,
                details: `${pkg.name || 'unnamed'}${pkg.version ? ` v${pkg.version}` : ''}`
            });

            let kitDependencyDetails = 'Missing @evitcastudio/kit dependency in package.json';
            if (isKitCoreRepo) {
                kitDependencyDetails = 'Core Framework Repository';
            } else if (kitVersionSpec) {
                kitDependencyDetails = `@evitcastudio/kit: ${kitVersionSpec}`;
            }

            results.push({
                category: 'Project',
                title: 'Kit framework dependency',
                passed: hasKitDependency,
                details: kitDependencyDetails
            });

            // If running inside a consumer game project, check game asset directory structure
            if (!isKitCoreRepo) {
                const resourcesDir = join(cwd, 'src', 'resources');
                const hasResources = existsSync(resourcesDir);
                let assetDetails = 'src/resources directory not found';
                if (hasResources) {
                    try {
                        const items = readdirSync(resourcesDir, { recursive: true });
                        assetDetails = `Ready (${items.length} asset${items.length === 1 ? '' : 's'})`;
                    } catch {
                        assetDetails = 'Asset directory present';
                    }
                }

                results.push({
                    category: 'Project',
                    title: 'Asset Directory (src/resources)',
                    passed: hasResources,
                    details: assetDetails
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
            buildDetails = 'Native CLI build ("kit build") + bun-build.ts';
        } else if (hasKitBuildScript) {
            buildDetails = 'Native CLI build ("kit build")';
        } else if (hasBuildScript) {
            buildDetails = 'Legacy build script (bun-build.ts)';
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
        const icon = res.passed ? theme.successIcon('✓') : theme.error('✗');
        const categoryBadge = `${theme.bracket('[')}${theme.brandBold(res.category)}${theme.bracket(']')}`;
        const titleText = res.passed ? theme.title(res.title) : theme.error(res.title);
        console.log(`  ${icon} ${categoryBadge} ${titleText}`);
        if (res.details) {
            console.log(`    ${theme.secondary(res.details)}`);
        }
        if (!res.passed) {
            allPassed = false;
        }
    }

    console.log('\n');
    if (allPassed) {
        console.log(`  ${theme.successIcon('✔')} ${theme.brandBold('All doctor diagnostics passed!')}\n`);
    } else {
        console.log(`  ${theme.warning('▲ Some issues were detected. Check the items above.')}\n`);
    }

    return allPassed;
}
