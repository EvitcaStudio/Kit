import './types/shared-types';
export class EventEmitter {
    listener;
    plugin;
    constructor(pListener, pPlugin) {
        this.listener = pListener;
        this.plugin = pPlugin;
    }
    /**
     * Emit an event to all listeners.
     * @param pEvent - The event to emit.
     */
    emit(pEvent) {
        if (pEvent.plugin && pEvent.plugin !== this.plugin.name) {
            throw new Error(`Event mismatch: ${this.plugin.name} tried to emit an event from the ${pEvent.plugin} namespace.`);
        }
        const event = {
            plugin: this.plugin.name,
            event: pEvent.event,
            data: pEvent?.data,
            timestamp: Date.now()
        };
        Object.freeze(event);
        this.listener(event);
    }
}
