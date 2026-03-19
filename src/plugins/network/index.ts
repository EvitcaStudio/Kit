import { KitPlugin } from '../kit-plugin';
import type { Client } from '../../types/vylo.d.ts';

export type NetworkListener<T extends unknown[] = unknown[]> = (pClient: Client, ...pData: T) => void;

export class Network extends KitPlugin {
    name = 'Network';
    /**
     * If this plugin is initiated.
     */
    private initiated: boolean = false;
    /**
     * The packets that this plugin has registered. It is in the format of name: index
     */
    private packets: Map<string, number> = new Map();
    /**
     * The packets that this plugin has registered. It is in the format of index: name
     */
    private reversedPacketMap: Map<number, string> = new Map();
    onRegistered(): void {
        this.initiated = true;
    }
    /**
     * The listeners that are registered.
     */
    private listeners = new Map<string, NetworkListener<unknown[]>>();
    /**
     * Register a listener for a packet.
     * @param pPacketName - The name of the packet that will be listened to.
     * @param pListener - The listener that will be called when the packet is received.
     */
    onPacket<T extends unknown[]>(pPacketName: string, pListener: NetworkListener<T>): void {
        if (!this.packets.has(pPacketName)) {
            throw new Error(`Packet name '${pPacketName}' is not registered.`);
        }
        this.listeners.set(pPacketName, pListener as NetworkListener<unknown[]>);
    }

    /**
     * Register a listener for a packet.
     * @deprecated Use `onPacket` instead.
     * @param pPacketName - The name of the packet that will be listened to.
     * @param pListener - The listener that will be called when the packet is received.
     */
    on<T extends unknown[]>(pPacketName: string, pListener: NetworkListener<T>): void {
        this.onPacket(pPacketName, pListener);
    }
    /**
     * API for receiving data from the server.
     * @param pClient - The client involved with this packet.
     * @param pPacketName - The name of the packet that was sent.
     * @param pData - The data that was sent.
     * @param [pVerbose] - If the plugin should log packets.
     */
    onNetwork(pClient: Client, pPacketName: number | string, pData: unknown[] = [], pVerbose?: boolean): void {
        if (!this.initiated) return;

        if (typeof pPacketName === 'number') {
            const packetName = this.reversedPacketMap.get(pPacketName);

            if (!packetName) {
                if (pVerbose) {
                    console.group(`Kit.${this.name}Plugin.onNetwork`);
                    console.warn(`Unknown packet index: ${pPacketName}`);
                    console.groupEnd();
                }
                return;
            }

            const listener = this.listeners.get(packetName);

            if (pVerbose) {
                console.group(`Kit.${this.name}Plugin.onNetwork`);
                if (!listener) {
                    console.warn(`No listener was registered for this packet: ${packetName}`);
                }
                console.log(`Packet name: ${pPacketName}`);
                console.log(`Resolved packet name: ${packetName}`)
                console.log(`Data:`, pData);
                console.groupEnd();
            }

            listener?.(pClient, ...pData);
        }
    }
    /**
     * Register the packets registry.
     * @param pPackets - An array of strings that represent the packet names.
     */
    registerPackets(pPackets: readonly string[]): void {
        this.packets.clear();
        this.reversedPacketMap.clear();
    
        pPackets.forEach((name, index) => {
            this.packets.set(name, index);
            this.reversedPacketMap.set(index, name);
        });
    }
    /**
     * Gets the index of a packet.
     * @param pPacketName - The name of the packet.
     */
    getPacket(pPacketName: string): number | undefined {
        const packet = this.packets.get(pPacketName);
        if (packet === undefined) {
            console.warn(`Packet '${pPacketName}' is not registered.`);
        };
        return packet;
    }
}