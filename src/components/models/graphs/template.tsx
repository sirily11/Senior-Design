import React from "react"
import { NodeObj, NodeTypes } from "./interfaces";
import rect from "react";
import { Layer, Rect, Text, Group, Line, Ellipse } from "react-konva";
import {BaseNode, BaseGraphObject, BaseGraphPage} from "../graphs/base_graph"

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

/**
 * Fix all methods so they render the correct shapes. Certain ellipses are commented out for the time being. 
 */

export class SafetyFeatureNode extends BaseNode {
    nodeType = NodeTypes.safetyFeature
    /**
     * Children
     */
    connection: SafetyFeatureNode[] = [];
    /**
     * x position
     */
    order?: number;
    title?: string | undefined
    /**
     * parent node
     */
    parent: SafetyFeatureNode | undefined;
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
            {/* <Ellipse x={x} y={y} radiusX={radiusX} radiusY={radiusY} fill={"purple"} /> */}
            <Rect x={x} y={y} width={width} height={height} fill={"purple"}/>
            <Text x={x + 10} y={y + radiusY} text={"Safety Feature"} />
            <Text x={x + 10} y={y + radiusY + 10} text={this.description ?? "None"} />
            {this.parent && <Line points={[this.parent.getXPos() + width/2, this.parent.getYPos() + height, x + width/2, y]} stroke="black" />}
        </Group>

    }
}

export class GeneralAssumptionNode extends BaseNode {
    nodeType = NodeTypes.generalAssumption
    /**
     * Children
     */
    connection: GeneralAssumptionNode[] = [];
    /**
     * x position
     */
    order?: number;
    title?: string | undefined
    /**
     * parent node
     */
    parent: SafetyFeatureNode | undefined;
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
            {/* <Ellipse x={x} y={y} radiusY={radiusY} radiusX={radiusX} fill={"blue"} /> */}
            <Rect x={x} y={y} width={width} height={height} fill={"blue"}/>
            <Text x={x + 10} y={y + radiusY} text={"General Assumption"} />
            <Text x={x + 10} y={y + radiusY + 10} text={this.description ?? "None"} />
            {this.parent && <Line points={[this.parent.getXPos() + width/2, this.parent.getYPos() + height, x + width/2, y]} stroke="black" />}
        </Group>

    }
}

export class ArgumentNode extends BaseNode {
    nodeType = NodeTypes.argument
    /**
     * Children
     */
    connection: ArgumentNode[] = [];
    /**
     * x position
     */
    order?: number;
    title?: string | undefined
    /**
     * parent node
     */
    parent: SafetyFeatureNode | undefined;
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
            <Rect x={x} y={y} width={width} height={height} fill={"orange"} />
            <Text x={x + 10} y={y + height / 2} text={"Argument"} />
            <Text x={x + 10} y={y + height / 2 + 10} text={this.description ?? "None"} />
            {this.parent && <Line points={[this.parent.getXPos() + width / 2, this.parent.getYPos() + height, x + width / 2, y]} stroke="black" />}
        </Group>

    }
}

export class GeneralEnvironmentNode extends BaseNode {
    nodeType = NodeTypes.generalEnvironment
    /**
     * Children
     */
    connection: GeneralEnvironmentNode[] = [];
    /**
     * x position
     */
    order?: number;
    title?: string | undefined
    /**
     * parent node
     */
    parent: SafetyFeatureNode | undefined;
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
            <Rect x={x} y={y} height={height/2} width={width} fill={"red"} />
            <Text x={x + 10} y={y + height / 2} text={"General Environment"} />
            <Text x={x + 10} y={y + height / 2 + 10} text={this.description ?? "None"} />
            {this.parent && <Line points={[this.parent.getXPos() + width / 2, this.parent.getYPos() + height, x + width / 2, y]} stroke="black" />}
        </Group>

    }
}

export class GeneralJustificationNode extends BaseNode {
    nodeType = NodeTypes.generalJustification
    /**
     * Children
     */
    connection: GeneralJustificationNode[] = [];
    /**
     * x position
     */
    order?: number;
    title?: string | undefined
    /**
     * parent node
     */
    parent: SafetyFeatureNode | undefined;
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
            {/* <Ellipse x={x} y={y} radiusX={radiusX} radiusY={radiusY} fill={"green"} /> */}
            <Rect x={x} y={y} width={width} height={height} fill={"green"} />
            <Text x={x + 10} y={y + height/2} text={"General Justification"} />
            <Text x={x + 10} y={y + height/2 + 10} text={this.description ?? "None"} />
            {this.parent && <Line points={[this.parent.getXPos() + width/2, this.parent.getYPos() + height, x + width/2, y]} stroke="black" />}
        </Group>

    }
}

export class SubGoalNode extends BaseNode {
    nodeType = NodeTypes.subGoal
    /**
     * Children
     */
    connection: SubGoalNode[] = [];
    /**
     * x position
     */
    order?: number;
    title?: string | undefined
    /**
     * parent node
     */
    parent: ArgumentNode | undefined;
    /**
     * Y position
     */
    level?: number;

    /**
     * Get x position of the node
     */
    getXPos(): number {
        let relativePos = (this.order ?? 0) * radiusX * 2 * padding_param

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

        return (this.level ?? 0) * radius * 2 * padding_param
    }

    /**
     * Render the node
     */
    render(): rect.ReactElement<any, string | ((props: any) => rect.ReactElement<any, string | any | (new (props: any) => rect.Component<any, any, any>)> | null) | (new (props: any) => rect.Component<any, any, any>)> {
        const x: number = this.getXPos()
        const y: number = this.getYPos()


        return <Group>
            {/* <Ellipse x={x} y={y} radiusX={radiusX} radiusY={radiusY} fill={"purple"} /> */}
            <Rect x={x} y={y} height={height} width={width} fill={"purple"}/>
            <Text x={x + 10} y={y + height/2} text={"Sub-Goal"} />
            <Text x={x + 10} y={y + height/2 + 10} text={this.description ?? "None"} />
            {this.parent && <Line points={[this.parent.getXPos() + width/2, this.parent.getYPos() + height, x + width/2, y]} stroke="black" />}
        </Group>

    }
}

export class SpecificAssumptionNode extends BaseNode {
    nodeType = NodeTypes.specificAssumption
    /**
     * Children
     */
    connection: SubGoalNode[] = [];
    /**
     * x position
     */
    order?: number;
    title?: string | undefined
    /**
     * parent node
     */
    parent: SpecificAssumptionNode | undefined;
    /**
     * Y position
     */
    level?: number;

    /**
     * Get x position of the node
     */
    getXPos(): number {
        let relativePos = (this.order ?? 0) *width * padding_param

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
            {/* <Ellipse x={x} y={y} radiusX={radiusX} radiusY={radiusY} fill={"blue"} /> */}
            <Rect x={x} y={y} width={width} height={height} fill={"blue"} />
            <Text x={x + 10} y={y + height/2} text={"Specific Assumption"} />
            <Text x={x + 10} y={y + height/2 + 10} text={this.description ?? "None"} />
            {this.parent && <Line points={[this.parent.getXPos() + width/2, this.parent.getYPos() + height, x + width/2, y]} stroke="black" />}
        </Group>

    }
}

export class SpecificJustificationNode extends BaseNode {
    nodeType = NodeTypes.specificJustification
    /**
     * Children
     */
    connection: SubGoalNode[] = [];
    /**
     * x position
     */
    order?: number;
    title?: string | undefined
    /**
     * parent node
     */
    parent: SpecificJustificationNode | undefined;
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
            {/* <Ellipse x={x} y={y} radiusX={radiusX} radiusY={radiusY} fill={"green"} /> */}
            <Rect x={x} y={y} width ={width} height={height} fill={"green"} />
            <Text x={x + 10} y={y + height/2} text={"Specific Justification"} />
            <Text x={x + 10} y={y + height/2 + 10} text={this.description ?? "None"} />
            {this.parent && <Line points={[this.parent.getXPos() + width/2, this.parent.getYPos() + height, x + width/2, y]} stroke="black" />}
        </Group>

    }
}

export class TemplateObject extends BaseGraphObject{

    /**
     * Get node class based on the node types
     * @param node node object
     */
    _getNode(node: NodeObj): BaseNode {
        switch (node.nodeType) {
            case "SAFETY_FEATURE": 
                return new SafetyFeatureNode(node)
            case "GENERAL_ASSUMPTION":
                return new GeneralAssumptionNode(node)
            case "ARGUMENT":
                return new ArgumentNode(node)
            case "GENERAL_ENVIRONMENT":
                return new GeneralEnvironmentNode(node)
            case "GENERAL_JUSTIFICATION":
                return new GeneralJustificationNode(node)
            case "SUB_GOAL":
                return new SubGoalNode(node)
            case "SPECIFIC_ASSUMPTION":
                return new SpecificAssumptionNode(node)
            case "SPECIFIC_JUSTIFICATION":
                return new SpecificJustificationNode(node)
            default:
                return new BaseNode(node)
        }
    }

    safetyFeatureChangeName(name: string, node: SafetyFeatureNode){
        node.title = name;
    }

    
    render(): rect.ReactElement<any, string | ((props: any) => rect.ReactElement<any, string | any | (new (props: any) => rect.Component<any, any, any>)> | null) | (new (props: any) => rect.Component<any, any, any>)> {
        return <Layer>{this.nodes.map((n) => n.render())}</Layer>
    }

}