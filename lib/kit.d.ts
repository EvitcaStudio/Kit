import './types/shared-types';
export declare class Kit {
    /**
     * A record of all plugins registered with the Kit class.
     */
    private static plugins;
    /**
     * A set of all plugin emitters.
     */
    private static emitters;
    /**
     * A record of all event listeners.
     */
    private static events;
    private constructor();
    /**
     * Initialize the Kit class with plugins.
     * @param pPlugins - An array of plugins to initialize.
     */
    static init(pPlugins: any[]): void;
    /**
     * Register a plugin with the Kit class.
     * @param pPlugin - The plugin to register.
     */
    static registerPlugin(pPlugin: any): void;
    /**
     * Gets a plugin by name.
     * @param pName - String name of the plugin to retrieve.
     */
    static getPlugin<T>(pName: string): T | undefined;
    /**
     * Lists all registered plugins.
     */
    static getPlugins(): string[];
    /**
     * Emit an event to all listeners.
     * @param pEvent - The event to emit.
     */
    private static emit;
    /**
    * Listen for an event.
    * @param pPluginName - The plugin namespace.
    * @param pEventName - The event name.
    * @param pListener - The listener to call when the event is emitted.
    */
    static on(pPluginName: string, pEventName: string, pListener: Listener): void;
    /**
     * Removes an event listener.
     * @param pPluginName - The plugin namespace.
     * @param pEventName - The event name.
     * @param pListener - The listener to remove.
     */
    static off(pPluginName: string, pEventName: string, pListener: (pData: EmitterEvent) => void): void;
    /**
     * Sets the resource locator for the engine to reference the files we have in the resources folder. interface | map | icon | macro | sound are checked for.
     * @param pData - An array of each file that was found in the resources folder
     */
    private static setResource;
    /**
     * Sets the resources found in resources and preloads all interfaces found.
     */
    static setResources(): Promise<void>;
}
//# sourceMappingURL=kit.d.ts.map