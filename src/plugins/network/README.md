---
title: Network Plugin
group: Plugins
category: Documentation
---

# Network Plugin

This plugin enhances communication between clients and servers by providing a simple and efficient way to send and receive packets.

## Client-Side Example
The client listens to incoming packets using the `onNetwork` method:
> [!IMPORTANT]
When using this plugin make sure the data you send is **in an array**. e.g, *`sendPacket('PACKET_NAME', [data, data2])`*
1. Setup the network listener:
    ```typescript
    // client-network.ts
    import { Kit, Network } from '@evitcastudio/kit';

    Kit.registerPlugin(Network);
    const networkPlugin = Kit.getPlugin<Network>('Network');

    VYLO.setType('Client', {
        onPacket(this: Client, pPacketName: string, pData: unknown[]) {
            networkPlugin.onNetwork(this, pPacketName, pData);
        }
    });
    ```
2. Create a file to store packets:
    ```typescript
    // serverPackets.ts
    export const serverPackets = [
        'SERVER_EXAMPLE_PACKET1',
        'SERVER_EXAMPLE_PACKET2',
        'SERVER_EXAMPLE_PACKET3'
    ] as const;
    ```

3. Import those packets and register them:
    ```typescript
    // client-network.ts
    import { serverPackets } from '/path/to/serverPackets.ts';
    networkPlugin.registerPackets(serverPackets);
    ```

4. Set up a listener for a specific server packet:
    ```typescript
    // client-network.ts
    networkPlugin.on('SERVER_EXAMPLE_PACKET1', (pClient, pData, /* additional parameters */) => {
        // When the server sends this packet, this function will be called.
    });
    ```

## Server-Side Example
The server follows an identical structure as the client, but imports `clientPackets` and registers `clientPackets`

## **Packet Handling**
This plugin lets you register and listen to packets by name, while internally using indexed packets for better efficiency, safety, and easier management. It helps reduce bandwidth usage and simplifies your codebase.

## **Client-Server Symmetry**
The system supports a symmetrical setup:
- **Client Side** imports and registers `serverPackets` for listening to packets sent by the server.
- **Server Side** imports and registers `clientPackets` for listening to packets sent by clients.
- This ensures the communication is secure, organized, and isolated.
