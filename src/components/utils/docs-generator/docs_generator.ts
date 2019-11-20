import * as Path from "path"
import * as fs from "fs"
import { resolve } from "dns";

export interface Menu {
    name: string;
    doc: Document;

}

interface Document {
    content: string
}


export class DocsGenerator {
    menus: Menu[]
    path: string;
    absolutePath: string;

    constructor(path: string) {
        this.path = path;
        this.absolutePath =  Path.join(process.cwd(), "src", "components" ,this.path)
        this.menus = [];
    }

    /**
     * Read docs from path
     */
    async readDocs() {
        this.menus = []
        return new Promise((resolve, reject) => {
 
            fs.readdir(this.absolutePath, { encoding: 'utf-8' }, (err: any, files: string[]) => {
                files.forEach((file) => {
                    if(!file.includes("ts")){
                        let p = Path.join(this.absolutePath, file)
                        let content = fs.readFileSync(p)
                        let document: Document = { content: content.toString() }
                        let menu: Menu = { name: file, doc: document }
                        this.menus.push(menu)
                    }
                })
                resolve()
            })
        })
    }

    async writeDocsToJS(){
        let p = Path.join(this.absolutePath, "document.ts")
        console.log()
        fs.writeFile(p,  `export const docs = ${JSON.stringify(this.menus)}`, (err)=>{
           if(err) console.log(err)
           
        })
    }
}

// /Users/sirily11/Desktop/Senior-Design/src/components/pages/Home/Introductions
let doc = new DocsGenerator("pages/Home/Introductions")
doc.readDocs().then(()=>{
    doc.writeDocsToJS()
})