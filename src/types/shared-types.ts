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
        data?: Record<string, any>;
    } & Record<string, any>;

    type Listener = (pData: EmitterEvent) => void;
}

export type { EmitterEvent, Listener };