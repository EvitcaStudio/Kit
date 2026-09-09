import type { ProcessOptions } from './types';
import { processResources } from './resource-builder';
import { processInit, type InitOptions } from './init';
import { processDoctor, type DoctorOptions } from './doctor';
import { processCreate, type CreateOptions } from './create';
import { processHost, type HostOptions, type HostResult } from './host';

export class KitCLI {
    /**
     * Start resource builder or watcher.
     * @param pProcessOptions - Configuration options for resource processing.
     */
    static async processResources(pProcessOptions: ProcessOptions): Promise<void> {
        await processResources(pProcessOptions);
    }

    /**
     * Start project initialization.
     * @param pInitOptions - Configuration options for project initialization.
     */
    static async init(pInitOptions: InitOptions): Promise<void> {
        await processInit(pInitOptions);
    }

    /**
     * Run environment and project diagnostics.
     * @param pDoctorOptions - Configuration options for diagnostics.
     */
    static async doctor(pDoctorOptions: DoctorOptions = {}): Promise<boolean> {
        return await processDoctor(pDoctorOptions);
    }

    /**
     * Create boilerplate code (e.g. plugins).
     * @param pCreateOptions - Configuration options for code generation.
     */
    static async create(pCreateOptions: CreateOptions): Promise<void> {
        await processCreate(pCreateOptions);
    }

    /**
     * Host game project locally.
     * @param pHostOptions - Configuration options for hosting.
     * @returns HostResult indicating status and server reference if applicable.
     */
    static async host(pHostOptions: HostOptions = {}): Promise<HostResult> {
        return await processHost(pHostOptions);
    }
}