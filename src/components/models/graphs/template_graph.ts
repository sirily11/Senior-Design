import { BaseGraphPage, BaseNode, BaseGraphObject } from './base_graph';


export class TemplateGraph extends BaseGraphPage {
    constructor() {
        super();
        this.graphs = [
            new BaseGraphObject({name: "Test", description: "Test graph", nodes: [  ]})
        ];
        this.selectedGraph = this.graphs[0];
    }
}