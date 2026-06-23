/**
 * Type definitions for VYI data structures
 */
import { IconPointExport } from './vendor/icon-point';
/**
 * Circle shape data structure as used in VYI files
 */
export interface CircleShape {
    type: 'circle';
    radius: number;
    xOrigin: number;
    yOrigin: number;
}
/**
 * Rectangle shape data structure as used in VYI files
 */
export interface RectShape {
    type: 'rect';
    width: number;
    height: number;
    xOrigin: number;
    yOrigin: number;
}
/**
 * Polygon shape data structure as used in VYI files
 */
export interface PolygonShape {
    type: 'polygon';
    vertices: number[];
}
/**
 * Frame data structure as used in VYI files
 * Array format: [dataURL, delay?]
 */
export interface FrameData {
    /** The data URL of the sprite in this frame */
    0: string;
    /** The delay of this frame in milliseconds (optional, defaults to parent delay) */
    1?: number;
}
/**
 * State data structure as used in VYI files
 * Array format: [name, dataURL, delay, frameArray, boundsData?]
 */
export interface StateData {
    /** The name of the state */
    0: string;
    /** The data URL of the sprite in this state */
    1: string;
    /** The delay of this state in milliseconds */
    2: number;
    /** Array of frame data for this state */
    3: FrameData[];
    /** Bounds data for this state (optional) */
    4?: Record<string, any>;
}
/**
 * Icon data structure as used in VYI files
 * Array format: [name, width, height, delay, dataURL, frameArray, stateArray?]
 */
export interface IconData {
    /** The name of the icon */
    0: string;
    /** The width of the icon in pixels */
    1: number;
    /** The height of the icon in pixels */
    2: number;
    /** The delay of the icon in milliseconds */
    3: number;
    /** The data URL of the sprite for this icon */
    4: string;
    /** Array of frame data for this icon */
    5: FrameData[];
    /** Array of state data for this icon (optional) */
    6?: StateData[];
    7?: IconPointExport[];
    8?: any;
}
/**
 * VYI file data structure
 * Object format: { v: version, i: icons[] }
 */
export interface VyiData {
    /** The version of the VYI format */
    v: number;
    /** Array of icon data */
    i: IconData[];
}
/**
 * VYI file data structure with optional name
 * Extended version that may include additional metadata
 */
export interface VyiFileData extends VyiData {
    /** Optional name for the VYI file */
    name?: string;
}
/**
 * Union type for all possible VYI input data types
 */
export type VyiInputData = string | VyiData | VyiFileData | Uint8Array | ArrayBuffer;
/**
 * Type guard to check if data is VyiData
 */
export declare function isVyiData(data: any): data is VyiData;
/**
 * Type guard to check if data is IconData
 */
export declare function isIconData(data: any): data is IconData;
/**
 * Type guard to check if data is FrameData
 */
export declare function isFrameData(data: any): data is FrameData;
/**
 * Type guard to check if data is StateData
 */
export declare function isStateData(data: any): data is StateData;
