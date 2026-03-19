import { Kit } from '@evitcastudio/kit';
import type { Network } from '@evitcastudio/kit';
import '../map-types';
import './c-network';
import resourceJSON from 'resource.json';

await Kit.setResources(resourceJSON);

const networkPlugin = Kit.getPlugin<Network>('Network');

// Set the resolution of the game
VYLO.setType('World', {
    onNew() {
        console.log('World created.');
    },
    onMapLoaded(this: World, pName: string) {
        console.log(`'${pName}' map loaded.`);
    }
});

VYLO.setType('Client', {
    mainOutput: '',
    maxFPS: 0,
    hideFPS: false,
    screenView: {
        scaleTo: 'normal',
        scaleNearest: true, 
        disableImageSmoothing: true
    },
    onConnect(this: Client) {
        console.log('onConnect');
        this.sendPacket(networkPlugin?.getPacket('SERVER_EXAMPLE2_PACKET')!, [1, 2, 3]);
    }
});

VYLO.setType('Mob/Player', {
    onLogin(this: Diob) {
        console.log('onLogin');
    },
    onLogout(this: Diob) {
        console.log('onLogout');
    }
});

await VYLO.load();