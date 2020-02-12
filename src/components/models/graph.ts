import { number } from "@lingui/core";
import nedb from "nedb";

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
    connection: NodeObj[]
}



export class Graph {
    graphs: GraphObj[] = []
    selectedGraph?: GraphObj
    db: Nedb<GraphObj>

    constructor() {
        this.db = new nedb({ filename: "graph.db", autoload: true });
    }

    /**
     * Create new graph with empty nodes
     */
    addGraph = (name: string, description: string): Promise<GraphObj> => {
        return new Promise((resolve, reject) => {
            let g: GraphObj = { name, description, nodes: [] }
            this.db.insert(g, (err, doc) => {
                if (err) { console.log(err); reject(err) }
                resolve(doc)
                this.graphs.push(doc)
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
                this.db.update({ _id: this.selectedGraph && this.selectedGraph._id }, { $push: { nodes: node } }, {}, (err, number) => {
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
    getAllGraph = (): Promise<GraphObj[]> => {
        return new Promise((resolve, reject) => {
            console.log(this.db)
            this.db.find({}, (err, docs) => {
                console.log(docs)
                if (err) {
                    console.log(err)
                    reject(err)
                }
                resolve(docs)
            })
        })
    }

}