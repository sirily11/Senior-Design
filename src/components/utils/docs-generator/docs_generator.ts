import * as path from "path"
const fs = (window as any).require("fs")

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

    constructor(path: string) {
        this.path = path;
        this.menus = [];
    }

    /**
     * Read docs from path
     */
    async readDocs() {
        this.menus = []
        return new Promise((resolve, reject) => {
            fs.readdir(this.path, { encoding: 'utf-8' }, (err: any, files: string[]) => {
                files.forEach((file) => {
                    let p = path.join(this.path, file);
                    let content = fs.readFileSync(p)
                    let document: Document = { content: content.toString() }
                    let menu: Menu = { name: file, doc: document }
                    this.menus.push(menu)
                })
                resolve()
            })
        })

    }
}