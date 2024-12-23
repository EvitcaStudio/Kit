import { processResources } from './resource-builder';
import type { ProcessOptions } from './types/shared-types';

export class KitCLI {
    /**
     * Start resource builder.
     */
    static async processResources(pProcessOptions: ProcessOptions): Promise<void> {
        await processResources(pProcessOptions);
    }
}