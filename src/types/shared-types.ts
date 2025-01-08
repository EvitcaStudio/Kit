import type { KitPlugin } from '../plugins/kit-plugin';
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

type KitPluginConstructor<T extends KitPlugin> = new () => T;
declare global {
    /**
     * The Vylocity engine.
     */
    /* eslint-disable-next-line no-var */
    var VYLO: VyloType;
}

export type { EmitterEvent, ResourceData, Listener, KitPluginConstructor };