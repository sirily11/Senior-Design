import React from "react";
import { NodeTypes } from "./interfaces";
import rect from "react";
import { Layer, Rect, Text, Group, Line, Circle, Ellipse } from "react-konva";
import BaseNode, { height, width, radius, radiusX, radiusY } from "./base_node";



export class GoalNode extends BaseNode {
  nodeType = NodeTypes.goal;

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

export class SolutionNode extends BaseNode {
  nodeType = NodeTypes.solution;

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
    const x: number = this.getXPos() + radius;
    const y: number = this.getYPos() + radius;

    if (preview) {
      return (
        <Group>
          <Circle x={radius} y={radius} radius={radius} fill={"blue"} />
          <Text x={radius} y={radius} text={this.title ?? "None"} />
        </Group>
      );
    }

    return (
      <Group>
        <Circle x={x} y={y} radius={radius} fill={"blue"} />
        <Text x={x} y={y / 2} text={this.title ?? "None"} />
        {this.parent && (
          <Line
            points={[
              this.parent.getXPos() + width / 2,
              this.parent.getYPos() + height,
              x,
              y - radius / 2
            ]}
            stroke="black"
          />
        )}
      </Group>
    );
  }
}

export class ContextNode extends BaseNode {
  nodeType = NodeTypes.context;

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
          <Rect
            x={0}
            y={0}
            height={height / 2}
            width={width}
            fill={"red"}
            cornerRadius={10}
          />
          <Text x={10} y={height / 4} text={this.title ?? "None"} />
        </Group>
      );
    }

    return (
      <Group>
        <Rect
          x={x}
          y={y}
          height={height / 2}
          width={width}
          fill={"red"}
          cornerRadius={10}
        />
        <Text x={x + 10} y={y + height / 4} text={this.title ?? "None"} />
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

export class JustificationNode extends BaseNode {
  nodeType = NodeTypes.justification;

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
    const x: number = this.getXPos() + radiusX;
    const y: number = this.getYPos() + radiusY;
    if (preview) {
      return (
        <Group>
          <Ellipse
            x={radiusX}
            y={radiusY}
            radiusX={radiusX}
            radiusY={radiusY}
            fill={"purple"}
          />
          <Text x={radiusX} y={radiusY} text={this.title ?? "None"} />
        </Group>
      );
    }

    return (
      <Group>
        <Ellipse
          x={x}
          y={y}
          radiusX={radiusX}
          radiusY={radiusY}
          fill={"purple"}
        />
        <Text x={x} y={y} text={this.title ?? "None"} />
        {this.parent && (
          <Line
            points={[
              this.parent.getXPos() + width / 2,
              this.parent.getYPos() + height,
              x,
              y - radiusY / 2
            ]}
            stroke="black"
          />
        )}
      </Group>
    );
  }
}

export class AssumptionNode extends BaseNode {
  nodeType = NodeTypes.assumption;

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
    const x: number = this.getXPos() + radiusX;
    const y: number = this.getYPos() + radiusY;
    if (preview) {
      return (
        <Group>
          <Ellipse
            x={radiusX}
            y={radiusY}
            radiusX={radiusX}
            radiusY={radiusY}
            fill={"orange"}
          />
          <Text x={radiusX} y={radiusY} text={this.title ?? "None"} />
        </Group>
      );
    }
    return (
      <Group>
        <Ellipse
          x={x}
          y={y}
          radiusX={radiusX}
          radiusY={radiusY}
          fill={"orange"}
        />
        <Text x={x} y={y} text={this.title ?? "None"} />
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


