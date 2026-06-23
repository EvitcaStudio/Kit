import { VyiInputData, VyiData } from './types';
export declare class VyiWorker {
    /** @internal */
    private pool;
    constructor(maxWorkers?: number);
    parse(data: VyiInputData): Promise<VyiData>;
    parseMultiple(dataArray: VyiInputData[]): Promise<VyiData[]>;
    parseMultipleWithProgress(dataArray: VyiInputData[], onProgress?: (completed: number, total: number) => void): Promise<VyiData[]>;
    getAvailableWorkerCount(): number;
    getTotalWorkerCount(): number;
    getStatus(): {
        totalWorkers: number;
        availableWorkers: number;
    };
    terminate(): void;
}
export declare function getVyiWorker(maxWorkers?: number): VyiWorker;
export declare function terminateVyiWorker(): void;
