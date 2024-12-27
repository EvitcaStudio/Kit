import { EventEmitter } from './event-system';
import './types/shared-types';
const VYLO = globalThis.VYLO;
const extensionToPath = {
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
};
export class Kit {
    /**
     * A record of all plugins registered with the Kit class.
     */
    static plugins = {};
    /**
     * A set of all plugin emitters.
     */
    static emitters = new Map();
    /**
     * A record of all event listeners.
     */
    static events = {};
    constructor() {
        throw new Error('[Kit] is not to be instantiated.');
    }
    /**
     * Initialize the Kit class with plugins.
     * @param pPlugins - An array of plugins to initialize.
     */
    static init(pPlugins) {
        pPlugins.forEach(pPlugin => {
            this.registerPlugin(pPlugin);
        });
    }
    /**
     * Register a plugin with the Kit class.
     * @param pPlugin - The plugin to register.
     */
    static registerPlugin(pPlugin) {
        const plugin = new pPlugin();
        if (Kit.plugins[plugin.name]) {
            throw new Error(`[Kit] plugin with name '${plugin.name}' is already registered.`);
        }
        const listener = (pEvent) => {
            Kit.emit(pEvent);
        };
        const emitter = new EventEmitter(listener, plugin);
        Kit.emitters.set(plugin.name, emitter);
        Kit.plugins[plugin.name] = plugin;
        plugin._register(emitter);
    }
    /**
     * Gets a plugin by name.
     * @param pName - String name of the plugin to retrieve.
     */
    static getPlugin(pName) {
        return Kit.plugins[pName];
    }
    /**
     * Lists all registered plugins.
     */
    static getPlugins() {
        return Object.keys(Kit.plugins);
    }
    /**
     * Emit an event to all listeners.
     * @param pEvent - The event to emit.
     */
    static emit(pEvent) {
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
    static on(pPluginName, pEventName, pListener) {
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
    static off(pPluginName, pEventName, pListener) {
        const eventScope = `${pPluginName}-${pEventName}`;
        if (Kit.events[eventScope].includes(pListener)) {
            Kit.events[eventScope].splice(Kit.events[eventScope].indexOf(pListener), 1);
        }
    }
    /**
     * Sets the resource locator for the engine to reference the files we have in the resources folder. interface | map | icon | macro | sound are checked for.
     * @param pData - An array of each file that was found in the resources folder
     */
    static setResource(pData) {
        pData.forEach((pResource) => {
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
    static async setResources() {
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
                const resources = Object.values(resourceJSON);
                // Group all data from separate arrays in object to one unified array of all resource data
                const consolidatedData = resources.flat();
                // Set all the resources
                this.setResource(consolidatedData);
            }
        }
        catch (pError) {
            console.error(`[Kit] error reading ${resourcePath}`, pError);
        }
    }
}
