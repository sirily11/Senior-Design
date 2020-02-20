import { BaseGraph, BaseNode } from './base_graph';


export class TemplateGraph extends BaseGraph {
    constructor() {
        super();
        this.graphs = [
            {
                _id: "0", name: "Graph 1", description: "Graph 1",
                nodes: [
                    new BaseNode({ color: "red", shape: "circle" }),
                    new BaseNode({ color: "red", shape: "circle" }),
                    new BaseNode({ color: "red", shape: "circle" }),
                    new BaseNode({ color: "red", shape: "circle" })
                ]
            },
            {
                _id: "1", name: "Graph 2", description: "Graph 2", nodes: [
                    new BaseNode({ color: "blue", shape: "rect" }),
                    new BaseNode({ color: "blue", shape: "rect" }),
                    new BaseNode({ color: "blue", shape: "rect" }),
                    new BaseNode({ color: "blue", shape: "rect" })
                ]
            }
        ];
        this.selectedGraph = this.graphs[0];
    }
}