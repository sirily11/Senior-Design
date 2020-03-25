import react, { ReactElement } from 'react';


export enum NodeTypes {
    basenode = "BASENODE"

}

export enum ConnectionTypes {
    basic = "BASIC"
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
    id: string;
    nodeType: NodeTypes;
    title?: string;
    connectionType?: ConnectionTypes
    // connected to objects
    connection: NodeObj[];
    parent?: NodeObj
    /// y position of the current node
    level?: number;
    /// x position of the current node
    order?: number;
    description: string;
}