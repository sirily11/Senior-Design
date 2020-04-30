import React, { useContext } from "react";
import { BaseGraphObject } from "../components/models/graphs/base_graph";
import { GraphObj, NodeTypes, NodeObj } from "../components/models/graphs/interfaces";
import BaseNode from "../components/models/graphs/base_node";
import { GoalNode } from "../components/models/graphs/gsn";

describe("Test 2 leaves", () => {
    let solutionNode: NodeObj = { id: "1", title: "solution", description: "Solution Node", nodeType: NodeTypes.solution, connection: []}
    let s1Node : NodeObj =      { id: "2", title: "solution 2", description: "Solution 2 Node", nodeType: NodeTypes.solution, connection: []}
    let goalNode: NodeObj =     { id: "0", title: "Root", description: "Root Node", nodeType: NodeTypes.goal, connection: [solutionNode, s1Node] }

    test("Test 2 leaves", () => {
        let graph = new BaseGraphObject({ _id: "test_graph", name: "Test", description: "Test graph", nodes: [goalNode, solutionNode, s1Node] })
        let number = graph.nodes[0]._getNumberOfLeaves(graph.nodes[0])
        expect(number).toBe(2)
    })
})

describe("Test 2 leaves", () => {
    let solutionNode: NodeObj = { id: "1", title: "solution", description: "Solution Node", nodeType: NodeTypes.solution, connection: []}
    let s1Node : NodeObj =      { id: "2", title: "solution 2", description: "Solution 2 Node", nodeType: NodeTypes.solution, connection: []}
    let goalNode: NodeObj =     { id: "0", title: "Root", description: "Root Node", nodeType: NodeTypes.goal, connection: [solutionNode, s1Node] }

    test("Test 2 leaves", () => {
        let graph = new BaseGraphObject({ _id: "test_graph", name: "Test", description: "Test graph", nodes: [goalNode, solutionNode, s1Node] })
        let number = graph.nodes[0]._getNumberOfLeaves(graph.nodes[0])
        expect(number).toBe(2)
    })
})

describe("Test Goal to Goal Connection", () => {
    let goal1Node: NodeObj =    { id: "1", title: "Goal 1", description: "Goal 1", nodeType: NodeTypes.goal, connection: []}    
    let goalNode: NodeObj =     { id: "0", title: "Root Goal", description: "Root Goal", nodeType: NodeTypes.goal, connection: [goal1Node]}

    test("Test Goal to Goal", () => {
        let graph = new BaseGraphObject({ _id: "test", name: "Test", description: "Test", nodes: [goal1Node, goalNode]})
        let number = graph.nodes[0]._getNumberOfLeaves(graph.nodes[0])
        expect(number).toBe(1)
    })
});

describe("Test Goal to Goal Connection", () => {
    let goal1Node: NodeObj =    { id: "1", title: "Goal 1", description: "Goal 1", nodeType: NodeTypes.goal, connection: []}    
    let goalNode: NodeObj =     { id: "0", title: "Root Goal", description: "Root Goal", nodeType: NodeTypes.goal, connection: [goal1Node]}

    test("Test Goal to Goal", () => {
        let graph = new BaseGraphObject({ _id: "test", name: "Test", description: "Test", nodes: [goal1Node, goalNode]})
        expect(graph.nodes[1]).toBe(graph.nodes[0].parent)
    })
});

describe("Test Goal to Solution Connection", () => {
    let solutionNode: NodeObj =    { id: "1", title: "Goal 1", description: "Goal 1", nodeType: NodeTypes.goal, connection: []}    
    let goalNode: NodeObj =     { id: "0", title: "Root Goal", description: "Root Goal", nodeType: NodeTypes.goal, connection: [solutionNode]}

    test("Test Goal to Goal", () => {
        let graph = new BaseGraphObject({ _id: "test", name: "Test", description: "Test", nodes: [solutionNode, goalNode]})
        let number = graph.nodes[0]._getNumberOfLeaves(graph.nodes[0])
        expect(number).toBe(1)
    })
});

describe("Test Goal to Solution Connection", () => {
    let goal1Node: NodeObj =    { id: "1", title: "Goal 1", description: "Goal 1", nodeType: NodeTypes.goal, connection: []}    
    let goalNode: NodeObj =     { id: "0", title: "Root Goal", description: "Root Goal", nodeType: NodeTypes.goal, connection: [goal1Node]}

    test("Test Goal to Goal", () => {
        let graph = new BaseGraphObject({ _id: "test", name: "Test", description: "Test", nodes: [goal1Node, goalNode]})
        expect(graph.nodes[1]).toBe(graph.nodes[0].parent)
    })
});

describe("Test number of leaves for solo root node", () => {
    let goalNode: NodeObj = { id: "0", title: "Root", description: "Root Node", nodeType: NodeTypes.goal, connection: [] }

    test("Get number of leaves", () => {
        let graph = new BaseGraphObject({ _id: "test_graph", name: "Test", description: "Test graph", nodes: [goalNode] })
        let number = graph.nodes[0]._getNumberOfLeaves(graph.nodes[0])
        expect(number).toBe(1)
    })
})

describe("Test 2 leaves", () => {
    let solutionNode: NodeObj = { id: "1", title: "solution", description: "Solution Node", nodeType: NodeTypes.solution, connection: []}
    let s1Node : NodeObj =      { id: "2", title: "solution 2", description: "Solution 2 Node", nodeType: NodeTypes.solution, connection: []}
    let goalNode: NodeObj =     { id: "0", title: "Root", description: "Root Node", nodeType: NodeTypes.goal, connection: [solutionNode, s1Node] }

    test("Test 2 leaves", () => {
        let graph = new BaseGraphObject({ _id: "test_graph", name: "Test", description: "Test graph", nodes: [goalNode, solutionNode, s1Node] })
        expect(graph.nodes[0]).toBe(graph.nodes[1].parent)
        expect(graph.nodes[0]).toBe(graph.nodes[2].parent)
    })
})

describe("Test 2 leaves children", () => {
    let solutionNode: NodeObj = { id: "1", title: "solution", description: "Solution Node", nodeType: NodeTypes.solution, connection: []}
    let s1Node : NodeObj =      { id: "2", title: "solution 2", description: "Solution 2 Node", nodeType: NodeTypes.solution, connection: []}
    let goalNode: NodeObj =     { id: "0", title: "Root", description: "Root Node", nodeType: NodeTypes.goal, connection: [solutionNode, s1Node] }

    test("Test 2 leaves children", () => {
        let graph = new BaseGraphObject({ _id: "test_graph", name: "Test", description: "Test graph", nodes: [goalNode, solutionNode, s1Node] })
        expect(graph.nodes[1]).toBe(graph.nodes[0].connection[0])
        expect(graph.nodes[2]).toBe(graph.nodes[0].connection[1])
    })
})