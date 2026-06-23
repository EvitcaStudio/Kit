import { VYI } from './vyi';
import { Frame } from './frame';
import { IconData, StateData, FrameData } from './types';
import { IconPoint, type Point, type Bounds, type PositionalPoint, type IconPointExport } from './vendor/icon-point';
import { CircleShape, RectShape, PolygonShape } from './types';
import { BoundsManager } from './bounds/bounds-manager';
/**
 * Icon class for managing individual icons within a VYI file
 */
export declare class Icon {
    /**
     * A map of icons that are state of this icon.
     */
    states: Map<string, Icon>;
    /**
     * A map of frames that are the frames of this icon.
     */
    frames: Map<number, Frame>;
    /**
     * The width of this icon. All states and frames of this icon must match this size.
     */
    width: number;
    /**
     * The height of this icon. All states and frames of this icon must match this size.
     */
    height: number;
    /**
     * The data URL of the sprite in this frame.
     */
    dataURL: string;
    /**
     * The delay of this frame.
     */
    delay: number;
    /**
     * The name of this icon.
     */
    name: string;
    /**
     * The icon that owns this icon. This means this icon is state.
     */
    parent: Icon | null;
    /**
     * The vyi this icon belongs to.
     */
    vyi: VYI | null;
    /**
     * A random unique Id attached to each icon to distinguish them from others in the event another icon shares the same name.
     */
    id: string;
    /**
     * An set of used Ids to prevent collusion between duplicate named icons.
     */
    static reservedIds: Set<string>;
    /** A set of icon points belonging to this icon. */
    iconPoints: Set<IconPoint>;
    /** The bounds of this icon. */
    boundsManager: BoundsManager;
    /**
     * A set of reserved icon point IDs that cannot be used for additional icon points or removed.
     */
    static reservedIconPointIds: Set<string>;
    /**
    * Generates a UUID (Universally Unique Identifier) version 4.
    *
    * @returns The generated UUID.
    */
    static generateId(): string;
    /**
     * Creates this icon instance.
     * @param pIconData - The icon data that is used to build this icon.
     */
    constructor(pIconData?: IconData);
    /**
     * Sets the parent for this state.
     * @param pParent - The parent icon of this state.
     */
    private setParent;
    /**
     * Removes the parent and vyi from this state.
     */
    private removeParent;
    /**
     * Sets the vyi of this icon.
     *
     * @param pVyi - The vyi that owns this icon.
     */
    setVyi(pVyi: VYI): void;
    /**
     * Removes the vyi from this icon.
     */
    removeVyi(): void;
    /**
     * Assigns an Id to this icon.
     */
    private assignId;
    /**
     * Gets the id of this icon.
     * @returns The id of this icon.
     */
    getId(): string;
    /**
     * Gets the vyi this icon belongs to.
     * @returns The vyi this icon belongs to.
     */
    getVyi(): VYI | null;
    /**
     * Gets the icon this state belongs to. If this icon is not a state, it will return undefined.
     * @returns The icon this state belongs to.
     */
    getParent(): Icon | null;
    /**
     * Gets the number of states this icon has.
     * @returns The amount of states this icon has.
     */
    getStateCount(): number;
    /**
     * Gets the number of frames this icon has.
     * @returns The amount of frames this icon has.
     */
    getFrameCount(): number;
    /**
     * Parses through the icon data and adds data to this icon.
     * @param pIconData - The icon data that is used to build this icon.
     */
    parse(pIconData: IconData): void;
    /**
     * Sets the initial icon points for this icon.
     */
    resetInitialIconPoints(): void;
    /**
     * Creates a new IconPoint from the provided geometry and identifier, adds it to this instance's
     * iconPoints collection, and returns the newly created object.
     *
     * @param pPoint - The location of the icon in coordinate space.
     * @param pBounds - The bounds that apply to or contain the icon point.
     * @param pIconPoint - The icon point position relative to the bounds.
     * @param pId - A string id for the icon point.
     * @returns The created IconPoint that was added to this.iconPoints.
     */
    addIconPoint(pPoint: Point, pBounds: Bounds, pIconPoint: PositionalPoint, pId: string): IconPoint | void;
    /**
     * Removes an icon point from this icon by its id.
     * @param pId - The id of the icon point to remove.
     */
    removeIconPoint(pId: string): void;
    /**
     * Gets an icon point by its id.
     * @param pId - The id of the icon point to get.
     * @returns - The icon point with the matching id, or undefined if not found.
     */
    getIconPointExportById(pId: string): IconPointExport | void;
    /**
     * Gets the icon point data of all icon points belonging to this icon.
     * @returns - An array of icon point data.
     */
    getIconPointsExport(): IconPointExport[];
    /**
     * Gets an icon point by its id.
     * @param pId - The id of the icon point to get.
     * @returns - The icon point with the matching id, or undefined if not found.
     */
    getIconPointById(pId: string): IconPoint | void;
    /**
     * Gets the icon point data of all icon points belonging to this icon.
     * @returns - An array of icon point data.
     */
    getIconPoints(): IconPoint[];
    /**
     * Gets all bounds of this icon.
     * @returns An object containing all bounds by their IDs.
     */
    getBoundsExport(): Record<string, CircleShape | RectShape | PolygonShape>;
    /**
     * Gets a specific bounds by its id.
     * @param pId - The id of the bounds to get.
     * @returns - The bounds with the matching id, or undefined if not found.
     */
    getBoundsById(pId: string): CircleShape | RectShape | PolygonShape | undefined;
    /**
     * Gets all bounds of this icon.
     * @returns An object containing all bounds by their IDs.
     */
    getIdsByShape(pShape: 'circle' | 'rect' | 'polygon'): string[];
    /**
     * Sets the bounds of this icon.
     * @param pId - The ID for the bounds.
     * @param pShape - The bounds shape object.
     * @returns This icon instance.
     */
    setBounds(pId: string, pShape: CircleShape | RectShape | PolygonShape): this;
    /**
     * Removes a bounds from this icon.
     * @param pId - The ID of the bounds to remove.
     * @returns This icon instance.
     */
    removeBounds(pId: string): this;
    /**
     * Updates the bounds of this icon.
     * @param pId - The ID of the bounds to update.
     * @param pShape - The partial bounds shape to update.
     * @returns This icon instance.
     */
    updateBounds(pId: string, pShape: Partial<CircleShape | RectShape | PolygonShape>): this;
    /**
     * Sets the size of this icon.
     * @param pWidth - The width of this icon.
     * @param pHeight - The height of this icon.
     * @returns This icon instance.
     */
    setSize(pWidth: number, pHeight: number): this;
    /**
     * Gets the width of the icon.
     * @returns The width of the icon.
     */
    getWidth(): number;
    /**
     * Gets the height of the icon.
     * @returns The height of the icon.
     */
    getHeight(): number;
    /**
     * Gets the width and height of this icon and returns it.
     * @returns An object with the width and height of this icon.
     */
    getSize(): {
        width: number;
        height: number;
    };
    /**
     * Sets the data url of this icon.
     * @param pDataURL - The base64 data of this image.
     * @returns This icon instance.
     */
    setDataURL(pDataURL: string): this;
    /**
     * Gets the data URL of this icon.
     * @returns The base64 data of this image.
     */
    getDataURL(): string;
    /**
     * Sets the frame delay of this icon.
     * @param pDelay - The delay to set this frame to.
     * @returns This icon instance.
     */
    setDelay(pDelay: number): this;
    /**
     * Gets the delay of this icon.
     * @returns The delay of this icon.
     */
    getDelay(): number;
    /**
     * Changes the name of this icon.
     * @param pName - The new name of the icon.
     * @returns This icon instance.
     */
    rename(pName: string): this;
    /**
     * Returns the name of this icon.
     * @returns The name of this icon.
     */
    getName(): string;
    /**
     * Sets all the frames belonging to this icon to the same delay.
     * @param pDelay - The delay to set all frames to.
     * @returns This icon instance.
     */
    setAllFrameDelays(pDelay: number): this;
    /**
     * Adds a new frame to this icon.
     * @param pFrameData - The frame data to give this frame.
     * @returns The frame that was added or undefined.
     */
    addFrame(pFrameData: Frame | FrameData): Frame | undefined;
    /**
     * Removes the frame passed.
     * @param pFrame - The frame to remove from this icon.
     * @returns This icon instance.
     */
    removeFrame(pFrame: Frame): this;
    /**
     * Removes the frame via it's index.
     * @param pIndex - The index of the frame to remove.
     * @returns This icon instance.
     */
    removeFrameByIndex(pIndex: number): this;
    /**
     * Index the frames properly.
     */
    private indexFrames;
    /**
     * Reorders the frame in the animation. The index of the passed frame will be swapped with the frame at pIndex.
     * The "first" frame of the animation is technically this icon's dataURL. So if you are aiming to change the order of this icon and convert it into a frame.
     * pCurrentIndex must be set to -1 to match this icon.
     *
     * @param pCurrentIndex - The current index of the frame.
     * @param pIndex - The index the frame will be moving to.
     * @returns This icon instance.
     */
    reorderFrame(pCurrentIndex: number, pIndex: number): this;
    /**
     * Gets the frame existing at pIndex.
     * Frame 0 will actually be frame "1" in the animation. As this icon will actually be frame 0.
     * If you are trying to get "frame" 1. Then you will need to use the icon's delay and data url. As that is frame 0.
     * @param pIndex - The index of the frame to get.
     * @returns The frame found at pIndex.
     */
    getFrame(pIndex: number): Frame | undefined;
    /**
     * Returns an array of all the frames this icons has.
     * @returns An array of frames this icon has.
     */
    getFrames(): Frame[];
    /**
     * Gets all the frames belonging to this icon.
     * @returns An array containing the frame data of all frames.
     */
    private getFramesData;
    /**
     * Adds this icon data as a state. A state is also an icon.
     * @param pIconData - The data used to create this state icon.
     * @returns The state that was added or undefined.
     */
    addState(pIconData: Icon | StateData): Icon | undefined;
    /**
     * Removes the state passed.
     * @param pState - The state to remove from this icon.
     * @returns This icon instance.
     */
    removeState(pState: Icon): this;
    /**
     * Removes the state via it's name. The LAST defined icon that has the passed name will be removed. As names are not unique.
     * @param pName - The name to use to find the state.
     * @returns This icon instance.
     */
    removeStateByName(pName: string): this;
    /**
     * Removes the state via it's id.
     * @param pId - The id to use to find the state.
     * @returns This icon instance.
     */
    removeStateById(pId: string): this;
    /**
     * Gets the state that has the name pName. The LAST defined state that has the passed name will be returned.
     * @param pName - The name of the state to get.
     * @returns The state that has the name of pName.
     */
    getState(pName: string): Icon | undefined;
    /**
     * Gets the state by the id provided.
     * @param pId - The id of the state.
     * @returns The state that has the id that was passed.
     */
    getStateById(pId: string): Icon | undefined;
    /**
     * Returns an array of all the states this icon has.
     * @returns An array of states this icon has.
     */
    getStates(): Icon[];
    /**
     * Returns an array of all the state names this icon has.
     * @returns An array of the state names.
     */
    getStateNames(): string[];
    /**
     * Gets all the states belonging to this icon.
     * @returns An array containing the state data of all frames.
     */
    private getStatesData;
    /**
     * Exports this icon as if it was a state in the proper vyi format.
     * @returns An array of data related to this icon as if it were a state.
     */
    private exportAsState;
    /**
     * Converts StateData to IconData format
     * @param stateData - The state data to convert
     * @returns IconData format
     */
    private convertStateDataToIconData;
    /**
     * Exports this icon's data into proper vyi format.
     * @returns An array of data related to this icon in the proper vyi format.
     */
    export(): IconData;
}
