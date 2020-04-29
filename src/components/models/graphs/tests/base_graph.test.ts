import React, { useContext } from "react";
import { BaseGraphObject } from "../base_graph";
import { GraphObj, NodeTypes, NodeObj } from "../interfaces";
import BaseNode from "../base_node";


describe("Test base node", () => {
    let node4 = new BaseNode({ id: "1", nodeType: NodeTypes.basenode, connection: [], description: "node 4" })
    let node3 = new BaseNode({ id: "2", nodeType: NodeTypes.basenode, connection: [], description: "node 3" })
    let node2 = new BaseNode({ id: "3", nodeType: NodeTypes.basenode, connection: [node3], description: "node 2" })
    let node1 = new BaseNode({ id: "4", nodeType: NodeTypes.basenode, connection: [node2], description: "node 1" })


    beforeEach(() => {
        node3.parent = node2;
        node2.parent = node1;

    })

    test("Test node level", () => {
        expect(node3.getLevel()).toBe(2)
        expect(node2.getLevel()).toBe(1)
        expect(node1.getLevel()).toBe(0)
    })

    test("Connect", async () => {
        node3.connect(node4)
        expect(node4.level).toBe(3)
    })
})

describe("Test base node 2", () => {
    let node4 = new BaseNode({ id: "1", nodeType: NodeTypes.basenode, connection: [], description: "node 4" })
    let node3 = new BaseNode({ id: "2", nodeType: NodeTypes.basenode, connection: [], description: "node 3" })
    let node2 = new BaseNode({ id: "3", nodeType: NodeTypes.basenode, connection: [], description: "node 2" })
    let node1 = new BaseNode({ id: "4", nodeType: NodeTypes.basenode, connection: [], description: "node 1" })


    test("Connect", async () => {

        node1.connect(node2)
        node1.connect(node3)
        node2.connect(node4)
        node3.connect(node4)

        expect(node4.level).toBe(2)
        expect(node1.level).toBe(0)
        expect(node2.order).toBe(0)
        expect(node3.order).toBe(1)

    })
})

describe("Test base graph which set up the graph connections", () => {
    let baseGraph: BaseGraphObject;
    let node3: NodeObj = { id: "3", title: "Test Node", description: "Test test", nodeType: NodeTypes.basenode, connection: [] }
    let node2: NodeObj = { id: "2", title: "Test Node", description: "Test test", nodeType: NodeTypes.basenode, connection: [] }
    let node1: NodeObj = { id: "1", title: "Test Node", description: "Test test", nodeType: NodeTypes.basenode, connection: [node2, node3] }


    let graph: GraphObj = {
        name: "My Graph",
        description: "Test",
        nodes: [node1, node2, node3]
    }


    test(("Test node type"), async () => {
        baseGraph = new BaseGraphObject(graph)

        expect(baseGraph.nodes.length).toBe(3)
        expect(baseGraph.nodes[0].connection.length).toBe(2)
        expect(baseGraph.nodes[1].parent?.id).toBe("1")
        expect(baseGraph.nodes[2].parent?.id).toBe("1")
    })

})


describe("complex graph test", () => {
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

    test("order and level test", () => {
        let graph = new BaseGraphObject({ _id: "test_graph", name: "Test", description: "Test graph", nodes: [node6, node5, node4, node3, node2, node1, node0] })

        expect(graph.nodes[0].level).toBe(0)
        expect(graph.nodes[1].level).toBe(1)
        expect(graph.nodes[2].level).toBe(1)
        expect(graph.nodes[3].level).toBe(2)
        expect(graph.nodes[4].level).toBe(2)
        expect(graph.nodes[5].level).toBe(2)
        expect(graph.nodes[6].level).toBe(2)

        expect(graph.nodes[0].order).toBe(0)
        expect(graph.nodes[1].order).toBe(0)
        expect(graph.nodes[2].order).toBe(1)
        expect(graph.nodes[3].order).toBe(0)
        expect(graph.nodes[4].order).toBe(1)
        expect(graph.nodes[5].order).toBe(0)
        expect(graph.nodes[6].order).toBe(1)

    })

})


describe("Test get number of leaves", () => {

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

    test("Get number of leaves", () => {
        let graph = new BaseGraphObject({ _id: "test_graph", name: "Test", description: "Test graph", nodes: [node6, node5, node4, node3, node2, node1, node0] })
        let number = graph.nodes[0]._getNumberOfLeaves(graph.nodes[0])
        expect(number).toBe(4)

        let number2 = graph.nodes[6]._getNumberOfLeaves(graph.nodes[6])
        expect(number2).toBe(1)
    })
})


describe("Save the graph", () => {

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

    test("Save the graph and then reload", () => {
        let graph = new BaseGraphObject({ _id: "test_graph", name: "Test", description: "Test graph", nodes: [node6, node5, node4, node3, node2, node1, node0] })
        let savedGraph = graph.save()
        let reloadGraph = new BaseGraphObject(savedGraph as GraphObj)
        expect(reloadGraph.nodes.length).toBe(7)
        expect(reloadGraph.name).toBe("Test")
        expect(reloadGraph._id).toBe("test_graph")
    })

})