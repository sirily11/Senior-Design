import nedb from "nedb";
import { NodeObj, GraphObj, Shape } from "./interfaces";





export abstract class BaseNode implements NodeObj {
    title?: string | undefined
    x?: number | undefined
    y?: number | undefined
    width?: number | undefined
    height?: number | undefined
    shape: Shape;
    connection: NodeObj[] = []

    constructor(shape: Shape) {
        this.shape = shape ?? { color: "blue", shape: "rect" };
    }

    /**
     * Connect to another node object
     * @param node a node object
     */
    async connect(node: BaseNode): Promise<void> {
        this.connection.push(node)
    }

    /**
     * Modify current node
     * @param newNode New Node object
     */
    async modify(newNode: NodeObj): Promise<void> {
        this.title = newNode.title;
        this.shape = newNode.shape;
        this.height = newNode.height;
        this.width = newNode.width;
    }

    async delete(): Promise<void> {

    }

}


export abstract class BaseGraph {
    graphs: GraphObj[] = []
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