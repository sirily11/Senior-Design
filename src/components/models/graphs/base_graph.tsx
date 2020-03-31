import React from "react";
import nedb from "nedb";
import { NodeObj, GraphObj, Shape, NodeTypes } from "./interfaces";
import rect from "react";
import { Layer, Rect, Text, Group, Line } from "react-konva";
import { v4 as uuidv4 } from "uuid";

/**
 * How much height you want for each node
 */
const height: number = 100;
/**
 * How much width you want for each node
 */
const width: number = 100;
/**
 * How much space you want for each node
 */
const padding_param = 1.2;

export class BaseNode implements NodeObj {
  id: string;
  nodeType = NodeTypes.basenode;
  /**
   * Children
   */
  connection: BaseNode[] = [];
  /**
   * x position
   */
  order?: number;
  title?: string | undefined;
  /**
   * parent node
   */
  parent: BaseNode | undefined;
  /**
   * Y position
   */
  level?: number;
  description: string;
  nodeObject: NodeObj;

  constructor(args: NodeObj) {
    this.id = args.id;
    this.level = this.getLevel();
    this.order = this.getOrder();
    this.parent = args.parent as BaseNode;
    this.description = args.description;
    this.title = args.title;
    this.nodeObject = args;
  }

  /**
   * Get level for the current node
   */
  getLevel(): number {
    let currentLevel = 0;
    let parent = this.parent;
    while (parent) {
      parent = parent.parent;
      currentLevel += 1;
    }
    return currentLevel;
  }

  getOrder(): number {
    if (this.parent) {
      let i = 0;
      for (let node of this.parent.connection) {
        if (node === this) {
          return i;
        }
        i += 1;
      }
    }
    return 0;
  }

  save(): NodeObj {
    return this.nodeObject;
  }

  /**
   * Get number of leaves of the node.
   * If the node has no child, return 1
   * @param node Node
   */
  _getNumberOfLeaves(node: BaseNode): number {
    if (node.connection.length === 0) {
      return 1;
    }

    let total = 0;
    for (let child of node.connection) {
      total += this._getNumberOfLeaves(child);
    }
    return total;
  }

  /**
   * Get x position of the node
   */
  getXPos(): number {
    let relativePos = (this.order ?? 0) * width * padding_param;

    // root position
    // if (!this.parent) {
    //     let numberOflLeaves = this._getNumberOfLeaves(this)
    //     return (numberOflLeaves / 2) * (width) * padding_param
    // }

    if (this.parent) {
      return relativePos + this.parent.getXPos() * 2;
    }
    // if (this.parent) {
    //     let offset = this.parent.connection.length === 1 ? 0 : (width / this.parent.connection.length)
    //     return relativePos + this.parent.getXPos() - offset
    // }

    return relativePos;
  }

  /**
   * Get y position of the node
   */
  getYPos(): number {
    return (this.level ?? 0) * height * padding_param;
  }

  /**
   * Connect to another node object
   * @param node a node object
   */
  connect(node: BaseNode): void {
    this.connection.push(node);
    node.parent = this;
    node.level = node.getLevel();
    node.order = node.getOrder();
  }

  /**
   * Modify current node
   * @param newNode New Node object
   */
  async modify(newNode: NodeObj): Promise<void> {
    this.title = newNode.title;
    this.description = newNode.description;
  }

  /**
   * Delete current node
   */
  async delete(): Promise<void> {}

  /**
   * Render the node
   */
  render(
    preview = false
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
    const x: number = this.getXPos();
    const y: number = this.getYPos();

    if (preview) {
      return (
        <Group>
          <Rect x={0} y={0} height={height} width={width} fill={"red"} />
          <Text x={10} y={height / 2} text={this.title ?? "None"} />
        </Group>
      );
    }

    return (
      <Group>
        <Rect x={x} y={y} height={height} width={width} fill={"red"} />
        <Text x={x + 10} y={y + height / 2} text={this.title ?? "None"} />
        {this.parent && (
          <Line
            points={[
              this.parent.getXPos() + width / 2,
              this.parent.getYPos() + height,
              x + width / 2,
              y
            ]}
            stroke="black"
          />
        )}
      </Group>
    );
  }
}

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
      default:
        return new BaseNode(node);
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

  save = (name?: string, description?: string): GraphObj => {
    return {
      name: name ?? this.name,
      _id: this._id,
      nodes: this.nodes.map(n => n.save()),
      description: description ?? this.description
    };
  };

  render(): rect.ReactElement<
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
    return <Layer>{this.nodes.map(n => n.render())}</Layer>;
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
      let data: GraphObj = graph
        ? graph.save(name, description)
        : { name: name, description: description, nodes: [] };
      delete data._id;
      this.db.insert(data, (err, doc) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          let newGraph = new BaseGraphObject(doc);
          resolve(newGraph);
          this.graphs.push(newGraph);
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
        console.log(docs);
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(docs.map(d => new BaseGraphObject(d)));
      });
    });
  };
}
