import nedb from "nedb";

export interface GraphObj{
    _id?: string;
    name: string;
    description : string
}



export class Graph{
    graphs: GraphObj[] = []
    db: Nedb<GraphObj>

    constructor(){
        this.db = new nedb({ filename: "graph.db", autoload: true });
    }


    addGraph = (name: string, description: string) : Promise<GraphObj> =>{
        return new Promise((resolve, reject)=>{
            this.db.insert({name, description}, (err, doc)=>{
                if (err){ console.log(err); reject(err)  }
                resolve(doc)
            })
        })
    }

    deleteGraph = (graph: Graph) =>{

    }

    getGraph = (id: string) : Promise<GraphObj> =>{
        return new Promise(async (resolve, reject)=>{

        })
    }
    
    getAllGraph = () : Promise<GraphObj[]> =>{
        return new Promise((resolve, reject) =>{
            this.db.find({}, (err, docs)=>{
                if(err){
                    console.log(err)
                    reject(err)
                }
                resolve(docs)
            })
        })
    }

}