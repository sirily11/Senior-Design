export type NodeShapeTypes = "circle" | "rect" | "star"

export interface Shape {
    color: string;
    shape: NodeShapeTypes
}

export interface GraphObj {
    _id?: string;
    name: string;
    description: string
    nodes: NodeObj[]
}

export interface NodeObj {
    title?: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    // shape of the objects
    shape: Shape;
    // connected to objects
    connection?: NodeObj[]
}