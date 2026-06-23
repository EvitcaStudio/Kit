import { VYI } from './vyi';
import { Icon } from './icon';
import { FrameData } from './types';
/**
 * Frame class for managing individual frames within an icon
 */
export declare class Frame {
    /**
     * The delay of this frame.
     */
    delay: number;
    /**
     * The data URL of the sprite in this frame.
     */
    dataURL: string;
    /**
     * The index of this frame. This indicates the order of the frame. 0 - Infinity.
     */
    index: number;
    /**
     * The icon that owns this frame.
     */
    parent: Icon | null;
    /**
     * The default delay in ms of frames.
     */
    static defaultDelay: number;
    /**
     * Create this frame class instance.
     * @param pFrameData - The frame data that is used to build this frame.
     */
    constructor(pFrameData?: FrameData);
    /**
     * Parses through the icon data and adds data to this frame.
     * @param pFrameData - The frame data that is used to build this frame.
     */
    private parse;
    /**
     * Sets the parent for this frame.
     * @param pParent - The parent icon of this frame.
     */
    setParent(pParent: Icon): void;
    /**
     * Removes the parent and vyi from this frame.
     */
    removeParent(): void;
    /**
     * Sets the delay of this frame in ms.
     * @param pDelay - The delay in ms to set this frame to.
     * @returns This frame instance.
     */
    setDelay(pDelay: number): this;
    /**
     * Gets the delay of this frame.
     * @returns The delay of this frame.
     */
    getDelay(): number;
    /**
     * Gets the index of this frame.
     * @returns The index of this frame.
     */
    getIndex(): number;
    /**
     * Sets the data url of this frame.
     * @param pDataURL - The base64 data of this image.
     * @returns This frame instance.
     */
    setDataURL(pDataURL: string): this;
    /**
     * Gets the data URL of this frame.
     * @returns The base64 data of this image.
     */
    getDataURL(): string;
    /**
     * Gets the width of the frame.
     * @returns The width of the frame.
     */
    getWidth(): number | undefined;
    /**
     * Gets the height of the frame.
     * @returns The height of the frame.
     */
    getHeight(): number | undefined;
    /**
     * Gets the width and height of this frame and returns it.
     * @returns An object with the width and height of this frame.
     */
    getSize(): {
        width: number;
        height: number;
    } | undefined;
    /**
     * Gets the vyi this frame belongs to.
     * @returns The vyi this frame belongs to.
     */
    getVyi(): VYI | null | undefined;
    /**
     * Gets the icon this frame belongs to.
     * @returns The icon this frame belongs to.
     */
    getParent(): Icon | null;
    /**
     * Exports this frame's data into proper vyi format.
     * @returns An array of data related to this frame in the proper vyi format.
     */
    export(): FrameData;
}
