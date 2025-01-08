import type { EmitterEvent, Listener } from '../types/shared-types';
import type { KitPlugin } from '../plugins/kit-plugin';

export class EventEmitter {
    private listener: Listener;
    private plugin: KitPlugin;

    constructor(pListener: Listener, pPlugin: KitPlugin) {
        this.listener = pListener;
        this.plugin = pPlugin;
    }
    
    /**
     * Emit an event to all listeners.
     * @param pEvent - The event to emit.
     */
    emit(pEvent: EmitterEvent): void {
        if (pEvent.plugin && pEvent.plugin !== this.plugin.name) {
            throw new Error(`Event mismatch: ${this.plugin.name} tried to emit an event from the ${pEvent.plugin} namespace.`);
        }

        const event: EmitterEvent = {
            plugin: this.plugin.name,
            event: pEvent.event,
            data: pEvent?.data,
            timestamp: Date.now()
        }
        Object.freeze(event);
        this.listener(event);
    }
}