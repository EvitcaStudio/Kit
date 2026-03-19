import type { ProcessOptions } from './types';
import { processResources } from './resource-builder';
import { processInit, type InitOptions } from './init';

export class KitCLI {
    /**
     * Start resource builder.
     */
    static async processResources(pProcessOptions: ProcessOptions): Promise<void> {
        await processResources(pProcessOptions);
    }

    /**
     * Start project initialization.
     */
    static async init(pInitOptions: InitOptions): Promise<void> {
        await processInit(pInitOptions);
    }
}