import nedb from "nedb";

export interface GraphObj {
    _id?: string;
    name: string;
    description: string
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
            let g: GraphObj = { name, description }
            this.db.insert(g, (err, doc) => {
                if (err) { console.log(err); reject(err) }
                resolve(doc)
                this.graphs.push(g)
            })
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