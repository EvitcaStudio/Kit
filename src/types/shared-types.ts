import type { VyloType } from './vylo.d.ts';
/**
 * The EmitterEvent type is used to define the shape of the data that is passed to the event listeners.
 */
type EmitterEvent = {
    /**
     * The event name, e.g., "draw-frame".
     */
    event: string;
    /**
     * The data associated with the event.
     */
    data?: Record<string, unknown>;
    [key: string]: unknown;
}

type ResourceData = {
    resourceIdentifier: string,
    fileName: string
};

type Listener = (pData: EmitterEvent) => void;

interface KitPluginLike {
    name: string;
    onRegistered?(): void;
    _register?(pEmitter: unknown): void;
    [key: string]: unknown;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type KitPluginConstructor<T = any, Args extends any[] = any[]> = new (...args: Args) => T;
declare global {
    /**
     * The Vylocity engine.
     */
    /* eslint-disable-next-line no-var */
    var VYLO: VyloType;
}

export type { EmitterEvent, ResourceData, Listener, KitPluginLike, KitPluginConstructor };