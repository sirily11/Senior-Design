import react, { ReactElement } from 'react';


export enum NodeTypes {
    basenode = "BASENODE"

}


export interface Shape {
    color: string;
    width?: number | undefined
    height?: number | undefined
}

export interface GraphObj {
    _id?: string;
    name: string;
    description: string
    nodes: NodeObj[]
}

export interface NodeObj {
    nodeType: NodeTypes;
    title?: string;
    // connected to objects
    connection: NodeObj[];
    parent?: NodeObj
    /// y position of the current node
    level?: number;
    /// x position of the current node
    order?: number;
    description: string;
}