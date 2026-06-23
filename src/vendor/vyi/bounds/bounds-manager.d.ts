import { CircleShape, RectShape, PolygonShape } from "../types";
export type BoundsShape = CircleShape | RectShape | PolygonShape;
export declare class BoundsManager {
    private bounds;
    /** Add a bounds shape */
    add(pId: string, pShape: BoundsShape): void;
    /** Remove a bounds by ID */
    remove(pId: string): void;
    /** Update a bounds */
    update(pId: string, pShape: Partial<BoundsShape>): void;
    /** Rename a saved bounds */
    rename(pId: string, pNewId: string): void;
    /** Get a bounds by ID */
    get(pId: string): BoundsShape | undefined;
    /** Get all bounds */
    getAll(): Record<string, BoundsShape>;
    /** Get all bounds of a specific shape */
    getIdsByShape(pShape: 'circle' | 'rect' | 'polygon'): string[];
    /** Export all bounds (same as getAll for simplicity) */
    exportAll(): Record<string, BoundsShape>;
    /** Clear all bounds */
    clearAll(): void;
    /** Load bounds from exported data */
    loadBounds(pBoundsData: Record<string, BoundsShape>): void;
}
