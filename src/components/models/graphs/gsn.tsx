import React from "react"
import nedb from "nedb";
import { NodeObj, GraphObj, Shape, NodeTypes } from "./interfaces";
import rect from "react";
import { Layer, Rect, Text, Group, Line, Circle, Ellipse } from "react-konva";
import {BaseNode} from "../graphs/base_graph"

/**
 * How much height you want for each node
 */
const height: number = 100;
/**
 * How much width you want for each node
 */
const width: number = 100;
/**
 * How much space you want for each node
 */
const padding_param = 1.2

const radius = 50;

const radiusX = 75;

const radiusY = 37;

export class GoalNode extends BaseNode {
    nodeType = NodeTypes.goal
    /**
     * Children
     */
    connection: GoalNode[] = [];
    /**
     * x position
     */
    order?: number;
    title?: string | undefined
    /**
     * parent node
     */
    parent: GoalNode | undefined;
    /**
     * Y position
     */
    level?: number;

    /**
     * Get number of leaves of the node.
     * If the node has no child, return 1
     * @param node Node
     */
    _getNumberOfLeaves(node: GoalNode): number {
        if (node.connection.length === 0) {
            return 1;
        }


        let total = 0;
        for (let child of node.connection) {
            total += this._getNumberOfLeaves(child)
        }
        return total;
    }

    /**
     * Get x position of the node
     */
    getXPos(): number {
        let relativePos = (this.order ?? 0) * width * padding_param

        // root position
        // if (!this.parent) {
        //     let numberOflLeaves = this._getNumberOfLeaves(this)
        //     return (numberOflLeaves / 2) * (width) * padding_param
        // }

        if (this.parent) {
            return relativePos + this.parent.getXPos() * 2
        }
        // if (this.parent) {
        //     let offset = this.parent.connection.length === 1 ? 0 : (width / this.parent.connection.length)
        //     return relativePos + this.parent.getXPos() - offset
        // }

        return relativePos

    }

    /**
     * Get y position of the node
     */
    getYPos(): number {

        return (this.level ?? 0) * height * padding_param
    }

    /**
     * Delete current node
     */
    async delete(): Promise<void> {

    }

    /**
     * Render the node
     */
    render(): rect.ReactElement<any, string | ((props: any) => rect.ReactElement<any, string | any | (new (props: any) => rect.Component<any, any, any>)> | null) | (new (props: any) => rect.Component<any, any, any>)> {
        const x: number = this.getXPos()
        const y: number = this.getYPos()


        return <Group>
            <Rect x={x} y={y} height={height/2} width={width} fill={"red"} />
            <Text x={x + 10} y={y + height / 2} text={this.title ?? "None"} />
            {this.parent && <Line points={[this.parent.getXPos() + width / 2, this.parent.getYPos() + height, x + width / 2, y]} stroke="black" />}
        </Group>

    }
}

export class StrategyNode extends BaseNode {
    nodeType = NodeTypes.strategy
    /**
     * Children
     */
    connection: StrategyNode[] = [];
    /**
     * x position
     */
    order?: number;
    title?: string | undefined
    /**
     * parent node
     */
    parent: StrategyNode | undefined;
    /**
     * Y position
     */
    level?: number;

    /**
     * Get x position of the node
     */
    getXPos(): number {
        let relativePos = (this.order ?? 0) * width * padding_param

        // root position
        // if (!this.parent) {
        //     let numberOflLeaves = this._getNumberOfLeaves(this)
        //     return (numberOflLeaves / 2) * (width) * padding_param
        // }

        if (this.parent) {
            return relativePos + this.parent.getXPos() * 2
        }
        // if (this.parent) {
        //     let offset = this.parent.connection.length === 1 ? 0 : (width / this.parent.connection.length)
        //     return relativePos + this.parent.getXPos() - offset
        // }

        return relativePos

    }

    /**
     * Get y position of the node
     */
    getYPos(): number {

        return (this.level ?? 0) * height * padding_param
    }

    /**
     * Render the node
     */
    render(): rect.ReactElement<any, string | ((props: any) => rect.ReactElement<any, string | any | (new (props: any) => rect.Component<any, any, any>)> | null) | (new (props: any) => rect.Component<any, any, any>)> {
        const x: number = this.getXPos()
        const y: number = this.getYPos()


        return <Group>
            <Rect x={x} y={y} height={height} width={width} fill={"red"} />
            <Text x={x + 10} y={y + height / 2} text={this.title ?? "None"} />
            {this.parent && <Line points={[this.parent.getXPos() + width / 2, this.parent.getYPos() + height, x + width / 2, y]} stroke="black" />}
        </Group>

    }
}

export class SolutionNode extends BaseNode {
    nodeType = NodeTypes.solution
    /**
     * Children
     */
    connection: SolutionNode[] = [];
    /**
     * x position
     */
    order?: number;
    title?: string | undefined
    /**
     * parent node
     */
    parent: SolutionNode | undefined;
    /**
     * Y position
     */
    level?: number;

    /**
     * Get x position of the node
     */
    getXPos(): number {
        let relativePos = (this.order ?? 0) * width * padding_param

        // root position
        // if (!this.parent) {
        //     let numberOflLeaves = this._getNumberOfLeaves(this)
        //     return (numberOflLeaves / 2) * (width) * padding_param
        // }

        if (this.parent) {
            return relativePos + this.parent.getXPos() * 2
        }
        // if (this.parent) {
        //     let offset = this.parent.connection.length === 1 ? 0 : (width / this.parent.connection.length)
        //     return relativePos + this.parent.getXPos() - offset
        // }

        return relativePos

    }

    /**
     * Get y position of the node
     */
    getYPos(): number {

        return (this.level ?? 0) * height * padding_param
    }

    /**
     * Render the node
     */
    render(): rect.ReactElement<any, string | ((props: any) => rect.ReactElement<any, string | any | (new (props: any) => rect.Component<any, any, any>)> | null) | (new (props: any) => rect.Component<any, any, any>)> {
        const x: number = this.getXPos()
        const y: number = this.getYPos()


        return <Group>
            <Circle x={x} y={y} radius={radius} fill={"blue"} />
            <Text x={x + 10} y={y + height / 2} text={this.title ?? "None"} />
            {this.parent && <Line points={[this.parent.getXPos() + width / 2, this.parent.getYPos() + height, x, y - radius/2]} stroke="black" />}
        </Group>

    }
}

export class ContextNode extends BaseNode {
    nodeType = NodeTypes.context
    /**
     * Children
     */
    connection: ContextNode[] = [];
    /**
     * x position
     */
    order?: number;
    title?: string | undefined
    /**
     * parent node
     */
    parent: ContextNode | undefined;
    /**
     * Y position
     */
    level?: number;

    /**
     * Get x position of the node
     */
    getXPos(): number {
        let relativePos = (this.order ?? 0) * width * padding_param

        // root position
        // if (!this.parent) {
        //     let numberOflLeaves = this._getNumberOfLeaves(this)
        //     return (numberOflLeaves / 2) * (width) * padding_param
        // }

        if (this.parent) {
            return relativePos + this.parent.getXPos() * 2
        }
        // if (this.parent) {
        //     let offset = this.parent.connection.length === 1 ? 0 : (width / this.parent.connection.length)
        //     return relativePos + this.parent.getXPos() - offset
        // }

        return relativePos

    }

    /**
     * Get y position of the node
     */
    getYPos(): number {

        return (this.level ?? 0) * height * padding_param
    }

    /**
     * Render the node
     */
    render(): rect.ReactElement<any, string | ((props: any) => rect.ReactElement<any, string | any | (new (props: any) => rect.Component<any, any, any>)> | null) | (new (props: any) => rect.Component<any, any, any>)> {
        const x: number = this.getXPos()
        const y: number = this.getYPos()


        return <Group>
            <Rect x={x} y={y} height={height/2} width={width} fill={"red"} cornerRadius={10} />
            <Text x={x + 10} y={y + height / 2} text={this.title ?? "None"} />
            {this.parent && <Line points={[this.parent.getXPos() + width / 2, this.parent.getYPos() + height, x + width / 2, y]} stroke="black" />}
        </Group>

    }
}

export class JustificationNode extends BaseNode {
    nodeType = NodeTypes.justification
    /**
     * Children
     */
    connection: JustificationNode[] = [];
    /**
     * x position
     */
    order?: number;
    title?: string | undefined
    /**
     * parent node
     */
    parent: JustificationNode | undefined;
    /**
     * Y position
     */
    level?: number;

    /**
     * Get x position of the node
     */
    getXPos(): number {
        let relativePos = (this.order ?? 0) * width * padding_param

        // root position
        // if (!this.parent) {
        //     let numberOflLeaves = this._getNumberOfLeaves(this)
        //     return (numberOflLeaves / 2) * (width) * padding_param
        // }

        if (this.parent) {
            return relativePos + this.parent.getXPos() * 2
        }
        // if (this.parent) {
        //     let offset = this.parent.connection.length === 1 ? 0 : (width / this.parent.connection.length)
        //     return relativePos + this.parent.getXPos() - offset
        // }

        return relativePos

    }

    /**
     * Get y position of the node
     */
    getYPos(): number {

        return (this.level ?? 0) * height * padding_param
    }

    /**
     * Render the node
     */
    render(): rect.ReactElement<any, string | ((props: any) => rect.ReactElement<any, string | any | (new (props: any) => rect.Component<any, any, any>)> | null) | (new (props: any) => rect.Component<any, any, any>)> {
        const x: number = this.getXPos()
        const y: number = this.getYPos()


        return <Group>
            <Ellipse x={x} y={y} radiusX={radiusX} radiusY={radiusY} fill={"purple"} />
            <Text x={x + 10} y={y + height / 2} text={this.title ?? "None"} />
            {this.parent && <Line points={[this.parent.getXPos() + width / 2, this.parent.getYPos() + height, x, y - radiusY / 2]} stroke="black" />}
        </Group>

    }
}

export class AssumptionNode extends BaseNode {
    nodeType = NodeTypes.assumption
    /**
     * Children
     */
    connection: AssumptionNode[] = [];
    /**
     * x position
     */
    order?: number;
    title?: string | undefined
    /**
     * parent node
     */
    parent: AssumptionNode | undefined;
    /**
     * Y position
     */
    level?: number;

    /**
     * Get x position of the node
     */
    getXPos(): number {
        let relativePos = (this.order ?? 0) * width * padding_param

        // root position
        // if (!this.parent) {
        //     let numberOflLeaves = this._getNumberOfLeaves(this)
        //     return (numberOflLeaves / 2) * (width) * padding_param
        // }

        if (this.parent) {
            return relativePos + this.parent.getXPos() * 2
        }
        // if (this.parent) {
        //     let offset = this.parent.connection.length === 1 ? 0 : (width / this.parent.connection.length)
        //     return relativePos + this.parent.getXPos() - offset
        // }

        return relativePos

    }

    /**
     * Get y position of the node
     */
    getYPos(): number {

        return (this.level ?? 0) * height * padding_param
    }

    /**
     * Render the node
     */
    render(): rect.ReactElement<any, string | ((props: any) => rect.ReactElement<any, string | any | (new (props: any) => rect.Component<any, any, any>)> | null) | (new (props: any) => rect.Component<any, any, any>)> {
        const x: number = this.getXPos()
        const y: number = this.getYPos()


        return <Group>
            <Ellipse x={x} y={y} radiusX={radiusX} radiusY={radiusY} fill={"orange"} />
            <Text x={x + 10} y={y + height / 2} text={this.title ?? "None"} />
            {this.parent && <Line points={[this.parent.getXPos() + width / 2, this.parent.getYPos() + height, x + width / 2, y]} stroke="black" />}
        </Group>

    }
}