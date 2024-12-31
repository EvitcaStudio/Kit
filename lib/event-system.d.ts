import './types/shared-types';
import type { KitPlugin } from '@evitcastudio/kit-plugin';
export declare class EventEmitter {
    private listener;
    private plugin;
    constructor(pListener: Listener, pPlugin: KitPlugin);
    /**
     * Emit an event to all listeners.
     * @param pEvent - The event to emit.
     */
    emit(pEvent: EmitterEvent): void;
}
//# sourceMappingURL=event-system.d.ts.map