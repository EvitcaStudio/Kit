import { buildResources } from './resource-builder';
import { BuildOptions } from './types/shared-types';

export class KitCLI {
    /**
     * Start resource builder.
     */
    static async buildResources(pBuildOptions: BuildOptions): Promise<void> {
        await buildResources(pBuildOptions);
    }
}