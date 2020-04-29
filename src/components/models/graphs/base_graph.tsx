import React from "react";
import nedb from "nedb";
import { NodeObj, GraphObj, Shape, NodeTypes } from "./interfaces";
import rect from "react";
import { Layer, Rect, Text, Group, Line } from "react-konva";
import { v4 as uuidv4 } from "uuid";
import {
  GoalNode,
  SolutionNode,
  ContextNode,
  AssumptionNode,
  JustificationNode
} from "./gsn";
import BaseNode from "./base_node";
import { ActionTypes } from "./base_node";
import {
  ArgumentNode,
  SafetyFeatureNode,
  GeneralAssumptionNode,
  GeneralEnvironmentNode,
  GeneralJustificationNode,
  SpecificAssumptionNode,
  SpecificJustificationNode,
  SubGoalNode
} from "./template";

/**
 * Graph object.
 * Extends this to have different graphs for template page.
 * User defined graph should be type of this
 */
export class BaseGraphObject implements GraphObj {
  _id?: string | undefined;
  name: string;
  description: string;
  nodes: BaseNode[];

  constructor(args: GraphObj) {
    this._id = args._id;
    this.name = args.name;
    this.description = args.description;
    this.nodes = args.nodes.map(n => this._getNode(n));
    for (let node of this.nodes) {
      let fromNode = args.nodes.filter(n => n.id === node.id);
      if (fromNode.length > 0) {
        for (let c of fromNode[0].connection) {
          let foundNodes = this.nodes.filter(n => n.id === c.id);
          if (foundNodes.length > 0) {
            let connectToNode: BaseNode = foundNodes[0];
            node.connect(connectToNode);
          }
        }
      }
    }
  }

  /**
   * Get node class based on the node types
   * @param node node object
   */
  _getNode(node: NodeObj): BaseNode {
    switch (node.nodeType) {
      case NodeTypes.goal:
        return new GoalNode(node);

      case NodeTypes.solution:
        return new SolutionNode(node);

      case NodeTypes.context:
        return new ContextNode(node);

      case NodeTypes.assumption:
        return new AssumptionNode(node);

      case NodeTypes.justification:
        return new JustificationNode(node);

      case NodeTypes.safetyFeature:
        return new SafetyFeatureNode(node);

      case NodeTypes.generalAssumption:
        return new GeneralAssumptionNode(node);

      case NodeTypes.generalEnvironment:
        return new GeneralEnvironmentNode(node);

      case NodeTypes.generalJustification:
        return new GeneralJustificationNode(node);

      case NodeTypes.specificAssumption:
        return new SpecificAssumptionNode(node);

      case NodeTypes.specificJustification:
        return new SpecificJustificationNode(node);

      case NodeTypes.subGoal:
        return new SubGoalNode(node);

      case NodeTypes.argument:
        return new ArgumentNode(node);

      default:
        return new BaseNode(node);
    }
  }

  generalAssumptionChangeDescription(name: string, nodeType: string) {
    for (let node of this.nodes) {
      if (node.nodeType === nodeType) {
        node.description = name;
      }
    }
  }

  safetyFeatureChangeDescription(name: string, nodeType: string) {
    for (let node of this.nodes) {
      if (node.nodeType === nodeType) {
        node.description = name;
      }
    }
  }

  generalEnvironmentChangeDescription(name: string, nodeType: string) {
    for (let node of this.nodes) {
      if (node.nodeType === nodeType) {
        node.description = name;
      }
    }
  }

  generalJustificationChangeDescription(name: string, nodeType: string) {
    for (let node of this.nodes) {
      if (node.nodeType === nodeType) {
        node.description = name;
      }
    }
  }

  subGoalChangeDescription(name: string, nodeType: string) {
    for (let node of this.nodes) {
      if (node.nodeType === nodeType) {
        node.description = name;
      }
    }
  }

  specificAssumptionChangeDescription(name: string, nodeType: string) {
    for (let node of this.nodes) {
      if (node.nodeType === nodeType) {
        node.description = name;
      }
    }
  }

  specificJustificationChangeDescription(name: string, nodeType: string) {
    for (let node of this.nodes) {
      if (node.nodeType === nodeType) {
        node.description = name;
      }
    }
  }

  argumentChangeDescription(name: string, nodeType: string) {
    for (let node of this.nodes) {
      if (node.nodeType === nodeType) {
        node.description = name;
      }
    }
  }

  /**
   * Add a node and then return a new node
   * @param node Node you want to add
   */
  addNode(node: BaseNode) {
    node.parent?.connect(node);
    this.nodes.push(node);
    return new BaseNode({
      id: uuidv4(),
      description: "",
      connection: [],
      nodeType: NodeTypes.basenode
    });
  }

  /// return the graph object
  save = (name?: string, description?: string) => {
    //@ts-ignore
    return {
      name: name ?? this.name,
      _id: this._id,
      nodes: this.nodes.map(n => n.save()),
      description: description ?? this.description
    };
  };

  render(
    actions?: ActionTypes
  ): rect.ReactElement<
    any,
    | string
    | ((
        props: any
      ) => rect.ReactElement<
        any,
        string | any | (new (props: any) => rect.Component<any, any, any>)
      > | null)
    | (new (props: any) => rect.Component<any, any, any>)
  > {
    return <Layer>{this.nodes.map(n => n.render(false, actions))}</Layer>;
  }
}

/**
 * A base graph page.
 * Extends this for template page and graph page
 */
export abstract class BaseGraphPage {
  /**
   * Pre-defined graphs
   */
  graphs: BaseGraphObject[] = [];
  /**
   * Select current display graph
   */
  selectedGraph?: BaseGraphObject;
  /**
   * Database instance
   */
  db: Nedb<GraphObj>;

  constructor() {
    this.db = new nedb({ filename: "graph.db", autoload: true });
  }

  /**
   * Create new graph
   */
  addGraph = (
    name: string,
    description: string,
    graph?: BaseGraphObject
  ): Promise<BaseGraphObject> => {
    return new Promise((resolve, reject) => {
      //@ts-ignore
      let data: GraphObj = graph
        ? graph.save(name, description)
        : { name: name, description: description, nodes: [] };
      delete data._id;
      console.log(data);
      this.db.insert(data, (err, doc) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          //@ts-ignore
          resolve(graph);
        }
      });
    });
  };

  /**
   * Add node to selected graph
   */
  addNode = (node: NodeObj) => {
    return new Promise((resolve, reject) => {
      if (this.selectedGraph) {
        // this.selectedGraph.
        resolve();
        this.db.update(
          { _id: this.selectedGraph?._id },
          { $push: { nodes: node } },
          {},
          (err, number) => {
            if (err) {
              console.log(err);
              reject();
            }
            console.log(number);
            resolve();
          }
        );
      }
    });
  };

  /**
   * Delete whole graph
   */
  deleteGraph = (graph: GraphObj) => {
    return new Promise((resolve, reject) => {
      if (this.selectedGraph) {
        console.log(graph);
        let index = this.graphs.findIndex(
          object => this.selectedGraph && this.selectedGraph._id === object._id
        );
        this.graphs.splice(index, 1);
        this.db.remove({ _id: this.selectedGraph._id }, (err, num) => {
          if (err) {
            console.error(err);
            reject();
          }
          this.selectedGraph = undefined;
          resolve();
        });
      }
    });
  };

  /**
   * Select graph.
   * Call this function when user select graph from graphs
   */
  selectGraph = (graph: BaseGraphObject) => {
    this.selectedGraph = graph;
  };

  /**
   * Get all graphs from database and put it into graphs
   */
  getAllGraph = (): Promise<BaseGraphObject[]> => {
    return new Promise((resolve, reject) => {
      this.db.find({}, (err, docs) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(docs.map(d => new BaseGraphObject(d)));
        console.log(docs);
        console.log(docs.map(d => new BaseGraphObject(d)));
      });
    });
  };
}
