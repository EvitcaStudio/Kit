declare global {
    /**
     * The EventData type is used to define the shape of the data that is passed to the event listeners.
     */
    type EventData = {
        /**
         * The event name, e.g., "draw-frame"
         */
        name: string;
        /**
         * The plugin namespace, e.g., "RendererPlugin", if no plugin, "Kit" is used.
         */
        plugin: string;
        /**
         * The data associated with the event.
         */
        data: Record<string, any>;
    };
}

export { EventData };