import type { KitPlugin } from '@evitcastudio/kit-plugin';

declare global {
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
    } & Record<string, unknown>;

    type ResourceData = {
        resourceIdentifier: string,
        fileName: string
    };

    type Listener = (pData: EmitterEvent) => void;

    type KitPluginConstructor<T extends KitPlugin> = new () => T;
    /* eslint-disable-next-line no-var */
    var VYLO: VyloType;
}

export type {};