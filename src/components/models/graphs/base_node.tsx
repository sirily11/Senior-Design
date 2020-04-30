import React from "react";
import { NodeObj, NodeTypes } from "./interfaces";
import { Layer, Rect, Text, Group, Line } from "react-konva";
import rect from "react";

export interface ActionTypes {
  onClick(node: BaseNode): void | undefined;
}

/**
 * How much height you want for each node
 */
export const height: number = 100;
/**
 * How much width you want for each node
 */
export const width: number = 100;
/**
 * How much space you want for each node
 */
export const padding_param = 1.2;

export const radius = 50;

export const radiusX = 100;

export const radiusY = 45;

export const strokeWidth = 3;

export default class BaseNode implements NodeObj {
  id?: string;
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

  save() {
    //@ts-ignore
    return {
      title: this.title,
      nodeType: this.nodeType,
      connection: this.connection.map(c => {
        return { id: c.id };
      }),
      parent: this.parent ? { id: this.parent?.id } : undefined,
      id: this.id,
      description: this.description
    };
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
    let order = this.order ?? 0;
    let relativePos = order * width * padding_param;
    let notCircle = [NodeTypes.basenode, NodeTypes.goal, NodeTypes.context];
    // root position
    // if (!this.parent) {
    //     let numberOflLeaves = this._getNumberOfLeaves(this)
    //     return (numberOflLeaves / 2) * (width) * padding_param
    // }

    if (this.parent) {
      let pos = relativePos + this.parent.getXPos() * 2;
      if (
        order > 0 &&
        !notCircle.includes(this.parent.connection[order - 1].nodeType)
      ) {
        pos = pos + radiusX;
      }
      return pos;
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
    preview = false,
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
      <Group
        onClick={() => {
          actions?.onClick(this);
        }}
        style={{ cursor: "grab" }}
      >
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
