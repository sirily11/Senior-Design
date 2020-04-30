import React from "react";
import { NodeObj, NodeTypes } from "./interfaces";
import rect from "react";
import { Layer, Rect, Text, Group, Line, Circle, Ellipse } from "react-konva";
import BaseNode, { height, width, radius, radiusX, radiusY } from "./base_node";
import {BaseGraphObject} from "./base_graph"

const padding_param = 1.2
const titleSize = 12
const fontSize = 10
const xTitleTextOffset = 55
const yTitleOffset = 20
const xDescTextOffset=25


/**
 * Fix all methods so they render the correct shapes. Certain ellipses are commented out for the time being. 
 */

export class SafetyFeatureNode extends BaseNode {

    nodeType = NodeTypes.safetyFeature

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
            x={radiusX + 10}
            y={radiusY + 10}
            radiusX={radiusX}
            radiusY={radiusY}
            fill={"purple"}
            shadowBlur={10}
          />
          <Text x={radiusX-xTitleTextOffset} y={radiusY-yTitleOffset} text={"Safety Feature"} fontSize={titleSize} fill={"white"}/>
          <Text x={radiusX-xDescTextOffset} y={radiusY} text={this.description ?? "None"} fontSize={fontSize} fill={"white"}/>
        </Group>
      );
    }

    return (
      <Group>
        <Ellipse
          x={x  + 10}
          y={y + 10}
          radiusX={radiusX}
          radiusY={radiusY}
          fill={"purple"}
          shadowBlur={10}
        />
       <Text x={x-xTitleTextOffset} y={y-yTitleOffset} text={"Safety Feature"} fontSize={titleSize} fill={"white"} />
        <Text x={x-xDescTextOffset} y={y} text={this.description ?? "None"} fontSize={fontSize} fill={"white"} />
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

export class GeneralAssumptionNode extends BaseNode {
    nodeType = NodeTypes.generalAssumption

    getDescription(): string {
        return this.description
      }

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
            fill={"blue"}
            shadowBlur={10}
          />
          <Text x={radiusX-xTitleTextOffset} y={radiusY-yTitleOffset} text={"General Assumption"} fontSize={titleSize} fill={"white"} />
          <Text x={radiusX-xDescTextOffset-45} y={radiusY} text={this.description ?? "None"} fontSize={fontSize} fill={"white"} />
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
          fill={"blue"}
          shadowBlur={10}
        />
        <Text x={x-xTitleTextOffset} y={y-yTitleOffset} text={"General Assumption"} fontSize={titleSize} fill={"white"} />
        <Text x={x-xDescTextOffset-45} y={y} text={this.description ?? "None"} fontSize={fontSize} fill={"white"} />
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

export class ArgumentNode extends BaseNode {
    nodeType = NodeTypes.argument

    /**
     * Render the node
     */
    render(): rect.ReactElement<any, string | ((props: any) => rect.ReactElement<any, string | any | (new (props: any) => rect.Component<any, any, any>)> | null) | (new (props: any) => rect.Component<any, any, any>)> {
        const x: number = this.getXPos()
        const y: number = this.getYPos()


        return <Group>
            <Rect x={x} y={y} width={width} height={height} fill={"orange"} shadowBlur={10}/>
            <Text x={x+25} y={y + 10} text={"Argument"} fontSize={titleSize} fill={"white"}/>
            <Text x={x+7} y={y + 25} text={"Argument over\n the effectiveness\n" + 
            " of the hazard-\nmigration strategies\n for the " + this.description} fontSize={fontSize} fill={"white"}/>
            {this.parent && <Line shadowBlur={10} points={[this.parent.getXPos() + width / 2, this.parent.getYPos() + height, x + width / 2, y]} stroke="black" />}
        </Group>

    }
}

export class GeneralEnvironmentNode extends BaseNode {
    nodeType = NodeTypes.generalEnvironment

    /**
     * Render the node
     */
    render(): rect.ReactElement<any, string | ((props: any) => rect.ReactElement<any, string | any | (new (props: any) => rect.Component<any, any, any>)> | null) | (new (props: any) => rect.Component<any, any, any>)> {
        const x: number = this.getXPos()
        const y: number = this.getYPos()


        return <Group>
        <Rect x={x} y={y} width={width} height={height} fill={"red"} shadowBlur={10} />
        <Text x={x} y={y + 10} text={"General Environment"} fontSize={titleSize-2} fill={"white"}/>
        <Text x={x+10} y={y + 25} text={this.description ?? "None"} fontSize={fontSize} fill={"white"}/>
        {this.parent && <Line shadowBlur={10} points={[this.parent.getXPos() + width / 2, this.parent.getYPos() + height, x + width / 2, y]} stroke="black" />}
    </Group>

    }
}

export class GeneralJustificationNode extends BaseNode {
    nodeType = NodeTypes.generalJustification

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
            x={radiusX + 10}
            y={radiusY}
            radiusX={radiusX}
            radiusY={radiusY}
            fill={"green"}
            shadowBlur={10}
          />
          <Text x={x-xTitleTextOffset} y={y-yTitleOffset} text={"General Justification"} fontSize={titleSize} fill={"white"} />
        <Text x={x-xDescTextOffset-30} y={y} text={this.description ?? "None"} fontSize={fontSize} fill={"white"} />
        </Group>
      );
    }

    return (
      <Group>
        <Ellipse
          x={x + 10}
          y={y}
          radiusX={radiusX}
          radiusY={radiusY}
          fill={"green"}
          shadowBlur={10}
        />
        <Text x={x-xTitleTextOffset} y={y-yTitleOffset} text={"General Justification"} fontSize={titleSize} fill={"white"} />
        <Text x={x-xDescTextOffset-30} y={y} text={this.description ?? "None"} fontSize={fontSize} fill={"white"} />
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


/**
 * Still have to fix the values in here. X values are basically hardcoded
 */
export class SubGoalNode extends BaseNode {
    nodeType = NodeTypes.subGoal

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
            x={radiusX - 50}
            y={radiusY}
            radiusX={radiusX}
            radiusY={radiusY}
            fill={"purple"}
            shadowBlur={10}
          />
          <Text x={x-xTitleTextOffset - 200} y={y-yTitleOffset} text={"Sub Goal"} fontSize={titleSize} fill={"white"} />
        <Text x={x-xDescTextOffset - 250} y={y} text={this.description ?? "None"} fontSize={fontSize} fill={"white"} />
        </Group>
      );
    }

    return (
      <Group>
        <Ellipse
          x={x - 200}
          y={y}
          radiusX={radiusX}
          radiusY={radiusY}
          fill={"purple"}
          shadowBlur={10}
        />
        <Text x={x-xTitleTextOffset - 200} y={y-yTitleOffset} text={"Sub Goal"} fontSize={titleSize} fill={"white"} />
        <Text x={x-xDescTextOffset - 250} y={y} text={this.description ?? "None"} fontSize={fontSize} fill={"white"} />
        {this.parent && (
          <Line
            points={[
              this.parent.getXPos() + width / 2,
              this.parent.getYPos() + height,
              x - 200,
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

/**
 * Still have to fix the values in here. X values are basically hardcoded
 */
export class SpecificAssumptionNode extends BaseNode {
    nodeType = NodeTypes.specificAssumption

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
            x={radiusX - 800}
            y={radiusY}
            radiusX={radiusX}
            radiusY={radiusY}
            fill={"indigo"}
            shadowBlur={10}
          />
         <Text x={x-xTitleTextOffset - 800} y={y-yTitleOffset} text={"Specific Assumption"} fontSize={titleSize} fill={"white"} />
        <Text x={x-xDescTextOffset - 850} y={y} text={this.description ?? "None"} fontSize={fontSize} fill={"white"} />
        </Group>
      );
    }

    return (
      <Group>
        <Ellipse
          x={x - 800}
          y={y}
          radiusX={radiusX}
          radiusY={radiusY}
          fill={"indigo"}
          shadowBlur={10}
        />
        <Text x={x-xTitleTextOffset - 800} y={y-yTitleOffset} text={"Specific Assumption"} fontSize={titleSize} fill={"white"} />
        <Text x={x-xDescTextOffset - 850} y={y} text={this.description ?? "None"} fontSize={fontSize} fill={"white"} />
        {this.parent && (
          <Line
            points={[
              this.parent.getXPos() + width / 2 - 200,
              this.parent.getYPos() + height,
              x-800,
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

/**
 * Still have to fix the values in here. X values are basically hardcoded
 */
export class SpecificJustificationNode extends BaseNode {
    nodeType = NodeTypes.specificJustification

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
            x={radiusX - 800}
            y={radiusY}
            radiusX={radiusX}
            radiusY={radiusY}
            fill={"green"}
            shadowBlur={10}
          />
          <Text x={x-xTitleTextOffset - 800} y={y-yTitleOffset} text={"Specific Justification"} fontSize={titleSize} fill={"white"} />
        <Text x={x-xDescTextOffset - 850} y={y} text={this.description ?? "None"} fontSize={fontSize} fill={"white"} />
        </Group>
      );
    }

    return (
      <Group>
        <Ellipse
          x={x - 800}
          y={y}
          radiusX={radiusX}
          radiusY={radiusY}
          fill={"green"}
          shadowBlur={10}
        />
        <Text x={x-xTitleTextOffset - 800} y={y-yTitleOffset} text={"Specific Justification"} fontSize={titleSize} fill={"white"} />
        <Text x={x-xDescTextOffset - 850} y={y} text={this.description ?? "None"} fontSize={fontSize} fill={"white"} />
        {this.parent && (
          <Line
            points={[
              this.parent.getXPos() + width / 2 - 200,
              this.parent.getYPos() + height,
              x - 800,
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