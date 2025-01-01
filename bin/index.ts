import type { ProcessOptions } from './types/shared-types';
import { processResources } from './resource-builder';

export class KitCLI {
    /**
     * Start resource builder.
     */
    static async processResources(pProcessOptions: ProcessOptions): Promise<void> {
        await processResources(pProcessOptions);
    }
}