import React, { useContext } from "react";
import { BaseGraphObject } from "../components/models/graphs/base_graph";
import { GraphObj, NodeTypes, NodeObj } from "../components/models/graphs/interfaces";
import BaseNode from "../components/models/graphs/base_node";
import { GoalNode } from "../components/models/graphs/gsn";

describe("Test Goal to Context", () => {
    let cNode: NodeObj =        { id: "1", title: "context", description: "Context Node", nodeType: NodeTypes.context, connection: []}
    let goalNode: NodeObj =     { id: "0", title: "Root", description: "Root Node", nodeType: NodeTypes.goal, connection: [cNode] }

    let graph = new BaseGraphObject({ _id: "test_graph", name: "Test", description: "Test graph", nodes: [goalNode, cNode] })

    test("Test Goal Node type", () => {
        expect(graph.nodes[0].nodeType).toBe("GOAL")
    })

    test("Test context node type", () => {
        expect(graph.nodes[1].nodeType).toBe("CONTEXT")
    })

    test("Test children", () => {
        expect(graph.nodes[0]).toBe(graph.nodes[1].parent)
    })
})

describe("Test Goal to Assumption", () => {
    let assNode: NodeObj =        { id: "1", title: "assumption", description: "Assumption Node", nodeType: NodeTypes.assumption, connection: []}
    let goalNode: NodeObj =     { id: "0", title: "Root", description: "Root Node", nodeType: NodeTypes.goal, connection: [assNode] }

    let graph = new BaseGraphObject({ _id: "test_graph", name: "Test", description: "Test graph", nodes: [goalNode, assNode] })

    test("Test Goal Node type", () => {
        expect(graph.nodes[0].nodeType).toBe("GOAL")
    })

    test("Test context node type", () => {
        expect(graph.nodes[1].nodeType).toBe("ASSUMPTION")
    })

    test("Test children", () => {
        expect(graph.nodes[0]).toBe(graph.nodes[1].parent)
    })
})

describe("Test Goal to Justification", () => {
    let jNode: NodeObj =        { id: "1", title: "justification", description: "Justification Node", nodeType: NodeTypes.justification, connection: []}
    let goalNode: NodeObj =     { id: "0", title: "Root", description: "Root Node", nodeType: NodeTypes.goal, connection: [jNode] }

    let graph = new BaseGraphObject({ _id: "test_graph", name: "Test", description: "Test graph", nodes: [goalNode, jNode] })

    test("Test Goal Node type", () => {
        expect(graph.nodes[0].nodeType).toBe("GOAL")
    })

    test("Test context node type", () => {
        expect(graph.nodes[1].nodeType).toBe("JUSTIFICATION")
    })

    test("Test children", () => {
        expect(graph.nodes[0]).toBe(graph.nodes[1].parent)
    })
})

describe("Test Goal to Solution", () => {
    let sNode: NodeObj =        { id: "1", title: "solution", description: "Solution Node", nodeType: NodeTypes.solution, connection: []}
    let goalNode: NodeObj =     { id: "0", title: "Root", description: "Root Node", nodeType: NodeTypes.goal, connection: [sNode] }

    let graph = new BaseGraphObject({ _id: "test_graph", name: "Test", description: "Test graph", nodes: [goalNode, sNode] })

    test("Test Goal Node type", () => {
        expect(graph.nodes[0].nodeType).toBe("GOAL")
    })

    test("Test context node type", () => {
        expect(graph.nodes[1].nodeType).toBe("SOLUTION")
    })

    test("Test children", () => {
        expect(graph.nodes[0]).toBe(graph.nodes[1].parent)
    })
})

describe("Test Goal to Solution and Context", () => {
    let cNode: NodeObj =        { id: "2", title: "context", description: "Context Node", nodeType: NodeTypes.context, connection: []}
    let sNode: NodeObj =        { id: "1", title: "solution", description: "Solution Node", nodeType: NodeTypes.solution, connection: []}
    let goalNode: NodeObj =     { id: "0", title: "Root", description: "Root Node", nodeType: NodeTypes.goal, connection: [sNode, cNode] }

    let graph = new BaseGraphObject({ _id: "test_graph", name: "Test", description: "Test graph", nodes: [goalNode, sNode, cNode] })

    test("Test Context Parent", () => {
        expect(graph.nodes[0]).toBe(graph.nodes[2].parent)
    })

    test("Test Solution Parent", () => {
        expect(graph.nodes[0]).toBe(graph.nodes[1].parent)
    })

    test("Check Context Type", () => {
        expect(graph.nodes[2].nodeType).toBe("CONTEXT")
    })

    test("Check Solution Type", () => {
        expect(graph.nodes[1].nodeType).toBe("SOLUTION")
    })

    test("Check Goal Type", () => {
        expect(graph.nodes[0].nodeType).toBe("GOAL")
    })
})