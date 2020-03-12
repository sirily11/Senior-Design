import nedb from "nedb";
import { NodeObj, GraphObj, Shape, NodeTypes } from "./interfaces";
import rect from "react";
import { Layer, Rect } from "react-konva";


const height: number = 100;
const width: number = 100;

export class BaseNode implements NodeObj {
    nodeType = NodeTypes.basenode
    /**
     * Children
     */
    connection: NodeObj[];
    /**
     * x position
     */
    order?: number;
    title?: string | undefined
    /**
     * parent node
     */
    parent: NodeObj | undefined;
    /**
     * Y position
     */
    level: number;
    description: string;

    constructor(args: NodeObj) {
        this.level = this.getLevel()
        this.order = args.order;
        this.parent = args.parent
        this.connection = args.connection
        this.description = args.description
        this.title = args.title
    }

    /**
     * Get level for the current node
     */
    getLevel(): number {
        let currentLevel = 0;
        let parent = this.parent;
        while (parent) {
            parent = parent.parent
            currentLevel += 1
        }
        return currentLevel;
    }

    /**
     * Connect to another node object
     * @param node a node object
     */
    async connect(node: BaseNode): Promise<void> {
        this.connection.push(node)
        node.parent = this
        node.level = node.getLevel()
        console.log(node.level)
    }

    /**
     * Modify current node
     * @param newNode New Node object
     */
    async modify(newNode: NodeObj): Promise<void> {
        this.title = newNode.title;
        this.description = newNode.description
    }

    /**
     * Delete current node
     */
    async delete(): Promise<void> {

    }

    render(): rect.ReactElement<any, string | ((props: any) => rect.ReactElement<any, string | any | (new (props: any) => rect.Component<any, any, any>)> | null) | (new (props: any) => rect.Component<any, any, any>)> {
        return <Rect x={this.order * width} y={this.level * height}></Rect>
    }


}

/**
 * Graph object.
 * Extends this to have different graphs for template page.
 * User defined graph should be type of this
 */
export class BaseGraphObject implements GraphObj {
    _id?: string | undefined;
    name: string;
    description: string;
    nodes: BaseNode[];

    constructor(args: GraphObj) {
        this._id = args._id
        this.name = args.name
        this.description = args.description;
        this.nodes = args.nodes.map((n) => this._getNode(n));
    }

    /**
     * Get node class based on the node types
     * @param node node object
     */
    _getNode(node: NodeObj): BaseNode {
        switch (node.nodeType) {
            default:
                return new BaseNode(node)
        }
    }


    save = (): GraphObj => {

        return { name: this.name, _id: this._id, nodes: this.nodes, description: this.description }
    }

    render(): rect.ReactElement<any, string | ((props: any) => rect.ReactElement<any, string | any | (new (props: any) => rect.Component<any, any, any>)> | null) | (new (props: any) => rect.Component<any, any, any>)> {
        return <Layer>{this.nodes.map((n) => n.render())}</Layer>
    }

}


/**
 * A base graph page.
 * Extends this for template page and graph page
 */
export abstract class BaseGraphPage {

    /**
     * Pre-defined graphs
     */
    graphs: BaseGraphObject[] = []
    /**
     * Select current display graph
     */
    selectedGraph?: GraphObj
    /**
     * Database instance
     */
    db: Nedb<GraphObj>

    constructor() {
        this.db = new nedb({ filename: "graph.db", autoload: true });
    }

    /**
     * Create new graph with empty nodes
     */
    addGraph = (name: string, description: string, graph?: GraphObj): Promise<GraphObj> => {
        return new Promise((resolve, reject) => {
            let g: GraphObj = graph ?? { name, description, nodes: [] }
            delete g._id
            this.db.insert(g, (err, doc) => {
                if (err) { console.log(err); reject(err) }
                resolve(doc)
                this.graphs.push(new BaseGraphObject(doc))
            })
        })
    }

    /**
     * Add node to selected graph
     */
    addNode = (node: NodeObj) => {
        return new Promise((resolve, reject) => {
            if (this.selectedGraph) {
                this.selectedGraph.nodes.push(node)
                resolve();
                this.db.update({ _id: this.selectedGraph?._id }, { $push: { nodes: node } }, {}, (err, number) => {
                    if (err) { console.log(err); reject() }
                    console.log(number)
                    resolve()
                })
            }
        })
    }

    /**
     * Delete whole graph
     */
    deleteGraph = (graph: GraphObj) => {
        return new Promise((resolve, reject) => {
            if (this.selectedGraph) {
                console.log(graph)
                let index = this.graphs.findIndex((object) => this.selectedGraph && this.selectedGraph._id === object._id)
                this.graphs.splice(index, 1)
                this.db.remove({ _id: this.selectedGraph._id }, (err, num) => {
                    if (err) { console.error(err); reject() }
                    this.selectedGraph = undefined
                    resolve();
                })
            }
        })
    }

    /**
     * Select graph.
     * Call this function when user select graph from graphs
     */
    selectGraph = (graph: GraphObj) => {
        this.selectedGraph = graph;
    }

    /**
     * Get all graphs from database and put it into graphs
     */
    getAllGraph = (): Promise<BaseGraphObject[]> => {
        return new Promise((resolve, reject) => {
            this.db.find({}, (err, docs) => {
                console.log(docs)
                if (err) {
                    console.log(err)
                    reject(err)
                }
                resolve(docs.map((d) => new BaseGraphObject(d)))
            })
        })
    }

}