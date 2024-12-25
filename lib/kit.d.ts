import type { EmitterEvent, Listener } from './types/shared-types';
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
}
//# sourceMappingURL=kit.d.ts.map