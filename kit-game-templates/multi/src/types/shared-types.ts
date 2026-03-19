import type { VyloType } from '../vylo';
declare global {
    /**
     * The vylo manager
     */
    var vyM: {
        [key: string]: unknown;
    };
    var PIXI: object;
    var __PIXI_APP__: PIXI.Application;
}

export {}