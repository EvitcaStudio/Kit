import { processResources } from './resource-builder';
import './types/shared-types';

export class KitCLI {
    /**
     * Start resource builder.
     */
    static async processResources(pProcessOptions: ProcessOptions): Promise<void> {
        await processResources(pProcessOptions);
    }
}