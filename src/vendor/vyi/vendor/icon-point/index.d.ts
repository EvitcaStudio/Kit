export interface Point {
    x: number;
    y: number;
}
export interface PositionalPoint {
    x: number;
    y: number;
    isNormalized?: boolean;
}
export interface Offset {
    x: number;
    y: number;
}
export interface Bounds {
    width: number;
    height: number;
}
export interface Anchor {
    x: number;
    y: number;
}
export interface Transform {
    x: number;
    y: number;
}
export interface IconPointExport {
    width: number;
    height: number;
    x: number;
    y: number;
    id: string;
}
/**
 * The IconPoint class.
 * A point that exists inside/outside a virtual rectangle. The point's position inside/outside of the rectangle is maintained when the rectangle is rotated.
 * * @example
 * ```typescript
 * // Create a rectangle at the position of (0,0)
 * const rectangle = { x: 0, y: 0 };
 * // Make the dimensions of the rectangle 100x50
 * const bounds = { width: 100, height: 50 };
 * // Create a point at the top left corner of the rectangle
 * const point = { x: 1, y: 1 };
 * // Create an icon point that will track the point on this rectangle when it moves/rotates
 * const tlPoint = new IconPoint(rectangle, bounds, point);
 * ```
 */
export declare class IconPoint {
    /**
     * Static offset to use when none is passed.
     */
    static defaultOffset: Offset;
    /**
     * Static anchor to use when none is passed. Default value of 0.5 signifies the anchor starts in the middle.
     */
    static defaultAnchor: Anchor;
    /**
     * The version of the module.
     */
    static version: string;
    /** The logger module this module uses to log errors / logs
     * @internal
     */
    private static logger;
    /**
     * An object storing the position of the point that was set. This is the point on the rectangle.
     * It can be changed at runtime.
     * ________
     * |       |
     * |   x   |
     * |       |
     * |_______|
     */
    iconPoint: Point;
    /**
     * The original point that was set when the IconPoint was created.
     * @internal
     */
    private originalPoint;
    /**
     * An object storing the position of the rectangle.
     * @internal
     */
    private positionalPoint;
    /**
     * An object storing the point's position with rotation taken into account.
     * @internal
     */
    private point;
    /**
     * An object storing the rectangle's size.
     * @internal
     */
    private bounds;
    /** The id of this icon point
     * @internal
     */
    private id;
    /**
     * Creates an instance of IconPoint.
     * @param pPoint - The rectangle this icon point exists inside/outside of.
     * @param pBounds - The size of the rectangle.
     * @param pIconPoint - The point that exists inside/outside the rectangle. This is in relative positioning to the rectangle.
     * ## Normalized
     * If you want to specify the point `(50, 50)` in a rectangle that is `100x100` using normalized values you would use `0.5`
     * The calculation will be `0.5 * 100` in both axis, which resolves to `(50, 50)`. This is just an easier way to assign the values.
     * @param pId - An optional ID for this icon point.
     */
    constructor(pPoint: Point, pBounds: Bounds, pIconPoint: PositionalPoint, pId?: string);
    /**
     * Gets the new point's position inside a rectangle after taking pAngle into account.
     * @param [pAngle=0] - Rotation of the rectangle this point exists inside/outside of in radians.
     * @param [pOffset] - The offset of the rectangle. Defaults to `IconPoint.defaultOffset`.
     * @param [pAnchor] - The anchor origin of the rectangle. Defaults to `IconPoint.defaultAnchor`.
     * @example
     * ```typescript
     * // Create a rectangle at the position of (0,0)
     * const rectangle = { x: 0, y: 0 };
     * // Make the dimensions of the rectangle 100x50
     * const bounds = { width: 100, height: 50 };
     * // Create a point at the top left corner of the rectangle
     * const point = { x: 1, y: 1 };
     * // Create an icon point that will track the point on this rectangle when it moves/rotates
     * const tlPoint = new IconPoint(rectangle, bounds, point);
     * // Verify the point is where it should be
     * console.log(tlPoint.getPoint()) // { x: 0, y: 0 } This shows that the point is at the position (0,0) which is the top left position of the rectangle
     * // Changing the position of the rectangle
     * rectangle.x += 100;
     * // Verify the point is where it should be after the rectangle changes positions
     * console.log(tlPoint.getPoint()) // { x: 100, y: 0 } This shows that the point has moved to the updated position of the rectangle
     * // Applying some offsets to the rectangle
     * const rectangleOffsets = { x: 25, y: 25 };
     * // Verify the point is where it should be after offsets have been applied to the rectangle
     * console.log(tlPoint.getPoint(undefined, rectangleOffsets)) // { x: 125, y: 25 } This shows that the point has moved to the updated position based on the offsets of the rectangle
     * // Applying some rotation to the rectangle
     * const angle = Math.PI;
     * // Verify the point is where it should be after rotating the rectangle by `angle`
     * console.log(tlPoint.getPoint(angle)) // {x: 200, y: 50.00000000000001} This shows that the point has moved to the updated position after the rectangle had been rotated by `angle`.
     * ```
     * @returns The point inside/outside of the rectangle after rotating, or void.
     */
    getPoint(pAngle?: number, pOffset?: Offset, pAnchor?: Anchor): Point | void;
    /**
     * Gets the new point's position inside a rectangle from an external point after taking pAngle into account.
     * @param pExternalPoint - The external point to calculate from.
     * @param pAngle - Rotation of the rectangle this point exists inside/outside of in radians.
     * @param pOffset - The offset of the rectangle. Defaults to `IconPoint.defaultOffset`.
     * @param pAnchor - The anchor origin of the rectangle. Defaults to `IconPoint.defaultAnchor`.
     * @returns - The point inside/outside of the rectangle after rotating, or void.
     */
    getPointFromExternalPoint(pExternalPoint: Point, pAngle?: number, pOffset?: Offset, pAnchor?: Anchor): Point | void;
    /**
     * Sets the static point and defines the raw pixels value
     * @param pPoint - The point that exists inside/outside the rectangle.
     * @internal
     */
    private setPoint;
    /**
     * Resets the point to the original point.
     */
    resetPoint(): void;
    /**
     * Updates the bounds of the rectangle this icon point exists inside/outside of.
     * @param pBounds - The bounds to update the rectangle with.
     */
    updateBounds(pBounds: Bounds): void;
    /**
     * Transforms the x point.
     * @param pTransformX - The x transform to transform the x point to.
     */
    transformX(pTransformX: number): void;
    /**
     * Transforms the y point.
     * @param pTransformY - The y transform to transform the y point to.
     */
    transformY(pTransformY: number): void;
    /**
     * Transforms the point.
     * @param pTransform - The transform to transform the point to.
     */
    transform(pTransform: Transform): void;
    /**
     * Gets the id of this icon point.
     * @returns The id of this point or ''.
     */
    getId(): string;
    /**
     * Exports the icon point data.
     * @returns - The exported icon point data.
     */
    export(): IconPointExport;
}
