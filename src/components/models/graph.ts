import nedb from "nedb";
import { number } from "@lingui/core";

export interface GraphObj {
    _id?: string;
    name: string;
    description: string
    nodes: NodeObj[]
}

export interface NodeObj {
    x: number;
    y: number;
    width: number;
    height: number;
}



export class Graph {
    graphs: GraphObj[] = []
    selectedGraph?: GraphObj
    db: Nedb<GraphObj>

    constructor() {
        this.db = new nedb({ filename: "graph.db", autoload: true });

    }


    addGraph = (name: string, description: string): Promise<GraphObj> => {
        return new Promise((resolve, reject) => {
            let g: GraphObj = { name, description, nodes: [] }
            this.db.insert(g, (err, doc) => {
                if (err) { console.log(err); reject(err) }
                resolve(doc)
                this.graphs.push(g)
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
                this.db.update({ _id: this.selectedGraph && this.selectedGraph._id }, { $push: { nodes: node } }, {}, (err, number) => {
                    if (err) { console.log(err); reject() }
                    resolve()
                })
            }
        })
    }

    deleteGraph = (graph: GraphObj) => {

    }

    selectGraph = (graph: GraphObj) => {
        this.selectedGraph = graph;
    }

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