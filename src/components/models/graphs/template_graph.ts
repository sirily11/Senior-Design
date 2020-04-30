import { BaseGraphPage, BaseGraphObject } from './base_graph';
import { NodeObj, NodeTypes, GraphObj } from './interfaces';
import BaseNode from './base_node';
import {
    SafetyFeatureNode, GeneralAssumptionNode, ArgumentNode, GeneralEnvironmentNode, GeneralJustificationNode,
    SubGoalNode, SpecificAssumptionNode, SpecificJustificationNode
} from './template'

/**
 * Predefined graph
 */

//Need this to update descriptions for these nodes. Possibly need getters and setters somewhere so it can grab 
//the description info from when we establish that in the template page. 
const graph1 = () => {
    /**
     *              6
     *              /\
     *             5  4
     *            /\  /\
     *           3 2  1 0
     */

    let node0: NodeObj = { id: "0", title: "Specific Justification", description: "node 0", nodeType: NodeTypes.specificJustification, connection: [] }
    let node1: NodeObj = { id: "1", title: "Specific Assumption", description: "node 1", nodeType: NodeTypes.specificAssumption, connection: [] }
    let node2: NodeObj = { id: "2", title: "Sub-Goal", description: "node 2", nodeType: NodeTypes.subGoal, connection: [node0, node1] }
    let node3: NodeObj = { id: "3", title: "General Justification", description: "node 3", nodeType: NodeTypes.generalJustification, connection: [] }
    let node4: NodeObj = { id: "4", title: "General Environment", description: "node 4", nodeType: NodeTypes.generalEnvironment, connection: [] }
    let node5: NodeObj = { id: "5", title: "Argument", description: "node 5", nodeType: NodeTypes.argument, connection: [node2] }
    let node6: NodeObj = { id: "6", title: "General Assumption", description: "node 6", nodeType: NodeTypes.generalAssumption, connection: [] }
    let node7: NodeObj = { id: "7", title: "Safety Feature", description: "node 7", nodeType: NodeTypes.safetyFeature, connection: [node3, node4, node5, node6] }

    return new BaseGraphObject({ _id: "test_graph", name: "Template 1", description: "Test graph", nodes: [node7, node6, node5, node4, node3, node2, node1, node0] });

}

const graph2 = () => {
    let node3: NodeObj = { id: "3", title: "General Justification", description: "node 3", nodeType: NodeTypes.generalJustification, connection: [] }
    let node4: NodeObj = { id: "4", title: "General Environment", description: "node 4", nodeType: NodeTypes.generalEnvironment, connection: [] }
    let node5: NodeObj = { id: "5", title: "Argument", description: "node 5", nodeType: NodeTypes.argument, connection: [] }
    let node6: NodeObj = { id: "6", title: "General Assumption", description: "node 6", nodeType: NodeTypes.generalAssumption, connection: [] }
    let node7: NodeObj = { id: "7", title: "Safety Feature", description: "node 7", nodeType: NodeTypes.safetyFeature, connection: [node3, node4, node5, node6] }

    return new BaseGraphObject({ _id: "test_graph 2", name: "Template 2", description: "Test graph 2", nodes: [node7, node6, node5, node4, node3] });

}

export class BaseGraph extends BaseGraphPage {
    constructor() {
        super();
        this.graphs = [
            graph1(),
            graph2()
        ];
        this.selectedGraph = this.graphs[0];
    }

}