import { Kit } from '@evitcastudio/kit';
import type { Network } from '@evitcastudio/kit';
import './vendor/vylocity-game-engine/vylo.server.js';
import '../map-types.js';
import './s-network.js';

import resourceJSON from 'resource.json';
await Kit.setResources(resourceJSON);

const networkPlugin = Kit.getPlugin<Network>('Network');

// Set the resolution of the game
VYLO.setType('World', {
    mainMob: '',
    mainMap: '',
    mainMacro: 'default-macro',
    gameWidth: 1280, 
    gameHeight: 720,
    playerMode: 2,
    preloadResources: '*',
    tileSize: { width: 32, height: 32 },
    onNew() {
        console.log('World created.');
        const well = VYLO.newDiob('MapObject/Well');
        well.setLoc(12, 16, 'main-map');
    },
    onMapLoaded(this: World, pName: string) {
        console.log(`'${pName}' map loaded.`);
    }
});

VYLO.setType('Client', {
    mapView: {
        preventAutoScale: false,
        zoom: { x: 2, y: 2 },
        anchor: { x: 0.5, y: 0.5 }
    },
    preventServerInterfaces: true,
    onConnect(this: Client) {
        console.log('onConnect');
        const mob = VYLO.newDiob('Mob/Player');
        this.setPlayerMob(mob);
        this.sendPacket(networkPlugin?.getPacket('CLIENT_EXAMPLE3_PACKET')!, [1, 2, 3]);
    }
});

VYLO.setType('Mob/Player', {
    onLogin(this: Diob) {
        console.log('onLogin');
        this.setLoc(10, 10, 'main-map');
    },
    onLogout(this: Diob) {
        console.log('onLogout');
        VYLO.delDiob(this);
    }
})

await VYLO.load();