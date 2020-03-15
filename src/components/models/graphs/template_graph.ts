import { BaseGraphPage, BaseNode, BaseGraphObject } from './base_graph';
import { NodeObj, NodeTypes } from './interfaces';


/**
 * Predefined graph
 */
const graph1 = () => {
    /**
     *              6
     *              /\
     *             5  4
     *            /\  /\
     *           3 2  1 0
     */
    let node0: NodeObj = { id: "0", title: "node 0", description: "node 0", nodeType: NodeTypes.basenode, connection: [] }
    let node1: NodeObj = { id: "1", title: "node 1", description: "node 1", nodeType: NodeTypes.basenode, connection: [] }
    let node2: NodeObj = { id: "2", title: "node 2", description: "node 2", nodeType: NodeTypes.basenode, connection: [] }
    let node3: NodeObj = { id: "3", title: "node 3", description: "node 3", nodeType: NodeTypes.basenode, connection: [] }
    let node4: NodeObj = { id: "4", title: "node 4", description: "node 4", nodeType: NodeTypes.basenode, connection: [node1, node0] }
    let node5: NodeObj = { id: "5", title: "node 5", description: "node 5", nodeType: NodeTypes.basenode, connection: [node3, node2] }
    let node6: NodeObj = { id: "6", title: "node 6", description: "node 6", nodeType: NodeTypes.basenode, connection: [node5, node4] }

    return new BaseGraphObject({ _id: "test_graph", name: "Test", description: "Test graph", nodes: [node6, node5, node4, node3, node2, node1, node0] })

}

/**
 * Predefined graph
 */
const graph2 = () => {
    /**
     *      2
     *      |
     *      1
     *      |
     *      0
     */
    let node0: NodeObj = { id: "0", title: "node 1", description: "node 1", nodeType: NodeTypes.basenode, connection: [] }
    let node1: NodeObj = { id: "1", title: "node 1", description: "node 1", nodeType: NodeTypes.basenode, connection: [node0] }
    let node2: NodeObj = { id: "2", title: "node 1", description: "node 1", nodeType: NodeTypes.basenode, connection: [node1] }

    return new BaseGraphObject({ _id: "test_graph 2", name: "Test 2", description: "Test graph", nodes: [node2, node1, node0] })

}


export class TemplateGraph extends BaseGraphPage {
    constructor() {
        super();
        this.graphs = [
            graph1(),
            graph2()
        ];
        this.selectedGraph = this.graphs[0];
    }
}