import { EventEmitter } from './event-system';
import type { KitPlugin } from '@evitcastudio/kit-plugin';
import type { EmitterEvent, ResourceData, Listener, KitPluginConstructor } from './types/shared-types';

const extensionToPath: Record<string, string> = {
    '.vyint': 'interface',
    '.vym': 'map',
    '.vyi': 'icon',
    '.vymac': 'macros',
    '.aac': 'sound',
    '.mp3': 'sound',
    '.wav': 'sound',
    '.m4a': 'sound',
    '.ogg': 'sound',
    '.flac': 'sound'
}

export class Kit {
    /**
     * A record of all plugins registered with the Kit class.
     */
    private static plugins: Record<string, KitPlugin> = {};
    /**
     * A set of all plugin emitters.
     */
    private static emitters = new Map<string, EventEmitter>();
    /**
     * A record of all event listeners.
     */
    private static events: Record<string, Array<Listener>> = {};

    private constructor() {
        throw new Error('[Kit] is not to be instantiated.');
    }

    /**
     * Initialize the Kit class with plugins.
     * @param pPlugins - An array of plugins to initialize.
     */
    static init<T extends KitPlugin>(pPlugins: KitPluginConstructor<T>[]): void {
        pPlugins.forEach(pPlugin => {
            this.registerPlugin(pPlugin);
        });
    }

    /**
     * Register a plugin with the Kit class.
     * @param pPlugin - The plugin to register.
     */
    static registerPlugin<T extends KitPlugin>(pPlugin: KitPluginConstructor<T>): void {
        const plugin = new pPlugin();

        if (Kit.plugins[plugin.name]) {
            throw new Error(`[Kit] plugin with name '${plugin.name}' is already registered.`);
        }

        const listener: Listener = (pEvent: EmitterEvent) => {
            Kit.emit(pEvent);
        }
        
        const emitter = new EventEmitter(listener, plugin);
        Kit.emitters.set(plugin.name, emitter);

        Kit.plugins[plugin.name] = plugin;
        plugin._register(emitter);
    }

    /**
     * Gets a plugin by name.
     * @param pName - String name of the plugin to retrieve.
     */
    static getPlugin<T extends KitPlugin>(pName: string): T | undefined {
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
     */
    private static emit(pEvent: EmitterEvent): void {
        const { plugin, event } = pEvent;
        const eventScope = `${plugin}-${event}`;

        if (!Kit.events[eventScope]) {
            return;
        }

        Kit.events[eventScope].forEach(pListener => pListener(pEvent));
    }
    
     /**
     * Listen for an event.
     * @param pPluginName - The plugin namespace.
     * @param pEventName - The event name.
     * @param pListener - The listener to call when the event is emitted.
     */
    static on(pPluginName: string, pEventName: string, pListener: Listener): void {
        const eventScope = `${pPluginName}-${pEventName}`;
        if (!Kit.events[eventScope]) {
            Kit.events[eventScope] = [];
        }
        Kit.events[eventScope].push(pListener);
    }

    /**
     * Removes an event listener.
     * @param pPluginName - The plugin namespace.
     * @param pEventName - The event name.
     * @param pListener - The listener to remove.
     */
    static off(pPluginName: string, pEventName: string, pListener: (pData: EmitterEvent) => void): void {
        const eventScope = `${pPluginName}-${pEventName}`;
        if (Kit.events[eventScope].includes(pListener)) {
            Kit.events[eventScope].splice(Kit.events[eventScope].indexOf(pListener), 1);
        }
    }

    /**
     * Sets the resource locator for the engine to reference the files we have in the resources folder. interface | map | icon | macro | sound are checked for.
     * @param pData - An array of each file that was found in the resources folder
     */
    private static setResource(pData: ResourceData[]): void {
        pData.forEach((pResource: ResourceData): void => {
            const extensionMatch = pResource.fileName.match(/\.[^.]+$/);
            const fileNameWithoutExtensionMatch = pResource.fileName.match(/(.+?)(?=\.[^.]+$|$)/);

            if (extensionMatch && fileNameWithoutExtensionMatch) {
                const extension = extensionMatch[0];
                const fileNameWithoutExtension = fileNameWithoutExtensionMatch[0];
                const resourceType = extensionToPath[extension];

                if (resourceType) {
                    globalThis.VYLO.Resource.setResource(resourceType, fileNameWithoutExtension, `resources/${resourceType}/${pResource.resourceIdentifier}`, true);
                }
            }
        });
    }
    
    /**
     * Sets the resources found in resources and preloads all interfaces found.
     */
    static async setResources(): Promise<void> {
        if (!globalThis.VYLO) {
            throw new Error('[Kit] VYLO is not defined. Please ensure the VYLO variable is available in the global namespace.');         
        }
        const resourcePath = './resource.json';
        // Load the resource json and set the resources found
        try {
            const response = await fetch(resourcePath);
            
            if (!response.ok) {
                throw new Error(`[Kit] HTTP error! Status: ${response.status}`);
            }

            const resourceJSON = await response.json();

            if (resourceJSON) {
                const resources: ResourceData[] = Object.values(resourceJSON);
                // Group all data from separate arrays in object to one unified array of all resource data
                const consolidatedData = resources.flat();
                // Set all the resources
                this.setResource(consolidatedData);
            }
        } catch (pError) {
            console.error(`[Kit] error reading ${resourcePath}`, pError);
        }
    }
}