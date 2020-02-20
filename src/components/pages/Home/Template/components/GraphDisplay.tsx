import React, { useContext } from "react";
import { Stage, Layer, Rect, Text, Circle } from "react-konva";
import { NodeObj } from "../../../../models/interfaces";
import { TemplatePageContext } from "../../../../models/TemplatePageContext";
import { Card, CardContent } from "@material-ui/core";
import { CardHeader } from "semantic-ui-react";

export default function GraphDisplay() {
  const renderShape = (node: NodeObj, index: number) => {
    const x = index * 100;
    const y = index * 100;
    switch (node.shape.shape) {
      case "circle":
        return (
          <Circle radius={50} x={x} y={y} fill={node.shape.color}></Circle>
        );
      default:
        return (
          <Rect width={40} height={40} x={x} y={y} fill={node.shape.color} />
        );
    }
  };
  const templateContext = useContext(TemplatePageContext);
  return (
    <div>
      <Stage width={window.innerWidth / 2} height={600}>
        <Layer>
          {templateContext.graph.selectedGraph?.nodes.map((n, i) =>
            renderShape(n, i)
          )}
        </Layer>
      </Stage>
      <Card>
        <CardContent>
          <CardHeader>
            <h3>{templateContext.graph.selectedGraph?.name}</h3>
          </CardHeader>
          <div>{templateContext.graph.selectedGraph?.description}</div>
        </CardContent>
      </Card>
    </div>
  );
}
