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
          <Rect x={0} y={0} height={height} width={width} fill={"red"} shadowBlur={10}/>
          <Text x={10} y={height / 2 - 20} text={this.title ?? "None"} fill={"white"}/>
          <Text x={10} y={height / 2 - 10} text={this.description ?? "None"} fill={"white"}/>
        </Group>
      );
    }

    return (
      <Group>
        <Rect x={x} y={y} height={height} width={width} fill={"red"} shadowBlur={10}/>
        <Text x={10} y={height / 2 - 20 } text={"Goal"} fill={"white"}/>
          <Text x={10} y={height / 2 - 10} text={this.description ?? "None"} fill={"white"}/>
        {this.parent && (
          <Line
            points={[
              this.parent.getXPos() + width / 2,
              this.parent.getYPos() + height,
              x + width / 2,
              y
            ]}
            stroke="black"
            shadowBlur={10}
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
          <Circle x={x} y={y} radius={radius} fill={"blue"} shadowBlur={10}/>
          <Text x={x - 15} y={y - 20} text={this.title ?? "None"} fill={"white"} />
          <Text x={x - 35} y={y - 10} text={this.description ?? "None"} fill={"white"} />
        </Group>
      );
    }

    return (
      <Group>
        <Circle x={x} y={y} radius={radius} fill={"blue"} />
        <Text x={x - 15} y={y - 20} text={this.title ?? "None"} fill={"white"} />
          <Text x={x - 35} y={y - 10} text={this.description ?? "None"} fill={"white"} />
        {this.parent && (
          <Line
            points={[
              this.parent.getXPos() + width / 2,
              this.parent.getYPos() + height,
              x,
              y - radius / 2
            ]}
            stroke="black"
            shadowBlur={10}
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
            shadowBlur={10}
          />
          <Text x={10} y={height / 4 - 20} text={this.title ?? "None"} fill={"white"} />
          <Text x={10} y ={height / 4 - 10} text={this.description ?? "None"} fill={"white"} />
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
          shadowBlur={10}
        />
        <Text x={x + 10} y={y + height / 4 - 20} text={this.title ?? "None"} />
        <Text x={10} y ={height / 4 - 10} text={this.description ?? "None"} fill={"white"} />
        {this.parent && (
          <Line
            points={[
              this.parent.getXPos() + width / 2,
              this.parent.getYPos() + height,
              x + width / 2,
              y, 
            ]}
            stroke="black"
            shadowBlur={10}
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
            shadowBlur={10}
          />
          <Text x={radiusX - 15} y={radiusY - 20} text={this.title ?? "None"} fill={"white"} />
          <Text x={radiusX - 75} y={radiusY - 10} text={this.description ?? "None"} fill={"white"} />
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
          shadowBlur={10}
        />
        <Text x={x - 15} y={y - 20} text={this.title ?? "None"} fill={"white"} />
        <Text x={x - 75} y={y - 10} text={this.description ?? "None"} fill={"white"} />
        {this.parent && (
          <Line
            points={[
              this.parent.getXPos() + width / 2,
              this.parent.getYPos() + height,
              x,
              y - radiusY / 2
            ]}
            stroke="black"
            shadowBlur={10}
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
            shadowBlur={10}
          />
          <Text x={radiusX - 15} y={radiusY - 20} text={this.title ?? "None"} fill={"white"} />
          <Text x={radiusX - 75} y={radiusY - 10} text={this.description ?? "None"} fill={"white"} />
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
          shadowBlur={10}
        />
        <Text x={radiusX - 15} y={radiusY - 20} text={this.title ?? "None"} fill={"white"} />
          <Text x={radiusX - 75} y={radiusY - 10} text={this.description ?? "None"} fill={"white"} />
        {this.parent && (
          <Line
            points={[
              this.parent.getXPos() + width / 2,
              this.parent.getYPos() + height,
              x + width / 2,
              y
            ]}
            stroke="black"
            shadowBlur={10}
          />
        )}
      </Group>
    );
  }
}

export class StrategyNode extends BaseNode {
  nodeType = NodeTypes.strategy;

 
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
          <Rect x={0} y={0} height={height} width={width} fill={"green"} shadowBlur={10}/>
          <Text x={10} y={height / 2 - 20} text={this.title ?? "None"} fill={"white"}/>
          <Text x={10} y={height / 2 - 10} text={this.description ?? "None"} fill={"white"}/>
        </Group>
      );
    }

    return (
      <Group>
        <Rect x={x} y={y} height={height} width={width} fill={"green"} shadowBlur={10} />
        <Text x={10} y={height / 2 - 20} text={this.title ?? "None"} fill={"white"}/>
        <Text x={10} y={height / 2 - 10} text={this.description ?? "None"} fill={"white"}/>
        {this.parent && (
          <Line
            points={[
              this.parent.getXPos() + width / 2,
              this.parent.getYPos() + height,
              x + width / 2,
              y
            ]}
            stroke="black"
            shadowBlur={10}
          />
        )}
      </Group>
    );
  }
}


