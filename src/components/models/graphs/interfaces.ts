import react, { ReactElement } from 'react';


export enum NodeTypes {
    basenode = "BASENODE",
    goal = "GOAL",
    strategy = "STRATEGY",
    solution = "SOLUTION",
    context = "CONTEXT",
    justification = "JUSTIFICATION",
    assumption = "ASSUMPTION",
    safetyFeature = "SAFETY_FEATURE",
    generalAssumption = "GENERAL_ASSUMPTION",
    argument = "ARGUMENT",
    generalEnvironment = "GENERAL_ENVIRONMENT",
    generalJustification = "GENERAL_JUSTIFICATION",
    subGoal = "SUB_GOAL",
    specificAssumption = "SPECIFIC_ASSUMPTION",
    specificJustification = "SPECIFIC_JUSTIFICATION"
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
    id?: string;
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