import React, { useContext } from "react";
import { BaseGraphObject, BaseNode } from "../base_graph";
import { GraphObj, NodeTypes } from "../interfaces";

describe("Test base graph", () => {
    let baseGraph: BaseGraphObject;
    let graph: GraphObj = {
        name: "My Graph",
        description: "Test",
        nodes: [{ title: "Test Node", description: "Test test", nodeType: NodeTypes.basenode, connection: [] }]
    }

    beforeEach(() => {
        baseGraph = new BaseGraphObject(graph)
    })

    test(("Test node type"), () => {
        expect(baseGraph.nodes[0] instanceof BaseNode).toBeTruthy()
        expect(baseGraph.nodes[0].title).toBe("Test Node")
    })
})


describe("Test base node", () => {
    let node4 = new BaseNode({ nodeType: NodeTypes.basenode, connection: [], description: "node 4" })
    let node3 = new BaseNode({ nodeType: NodeTypes.basenode, connection: [], description: "node 3" })
    let node2 = new BaseNode({ nodeType: NodeTypes.basenode, connection: [node3], description: "node 2" })
    let node1 = new BaseNode({ nodeType: NodeTypes.basenode, connection: [node2], description: "node 1" })


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
        await node3.connect(node4)
        expect(node4.level).toBe(3)
    })
})