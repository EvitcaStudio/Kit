import { EventEmitter } from './event-system';
import { EventData } from './types/shared-types';

export class Kit {
    /**
     * A record of all plugins registered with the Kit class.
     */
    private static plugins: Record<string, /*KitPlugin*/any> = {};
    /**
     * The event system for the Kit class.
     */
    private static emitter = EventEmitter;

    /**
     * Initialize the Kit class with plugins.
     * @param pPlugins - An array of plugins to initialize.
     */
    static async init(pPlugins: /* KitPlugin[]*/any[]): Promise<void> {
        const plugins = pPlugins.map(pPlugin => new pPlugin());
        const registeredPlugins = await Promise.all(plugins.map(pPlugin => pPlugin.register(Kit)));
        registeredPlugins.forEach(pPlugin => Kit.plugins[pPlugin.name] = pPlugin);
    }

    /**
     * Gets a plugin by name.
     * @param pName - String name of the plugin to retrieve.
     */
    static getPlugin<T /* extends KitPlugin */>(pName: string): T | undefined {
        return Kit.plugins[pName] as T;
    }

    /**
     * Lists all registered plugins.
     */
    static getPlugins(): string[] {
        return Object.keys(Kit.plugins);
    }
    
    /**
     * Emit an event to all listeners.
     * @param pEvent - The event to emit.
     * @param pData - The data to pass to the event listeners.
     */
    static emit(pEvent: EventData): void {
        Kit.emitter.emit(pEvent);
    }
    
    /**
     * Listen for an event.
     * @param pPluginName - The plugin namespace. "Kit" is used if no plugin is provided.
     * @param pEventName - The event name.
     * @param pListener - The listener to call when the event is emitted.
     */
    static on(pPluginName: string, pEventName: string, pListener: (pData: EventData) => void): void {
        Kit.emitter.on(pPluginName, pEventName, pListener);
    }

    /**
     * Removes an event listener.
     * @param pPluginName - The plugin namespace. "Kit" is used if no plugin is provided.
     * @param pEventName - The event name.
     * @param pListener - The listener to remove.
     */
    static off(pPluginName: string, pEventName: string, pListener: (pData: EventData) => void): void {
        Kit.emitter.off(pPluginName, pEventName, pListener);
    }
}