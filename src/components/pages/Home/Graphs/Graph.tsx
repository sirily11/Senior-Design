import React, { useContext } from "react";

import { Stage, Layer, Rect, Text, Circle } from "react-konva";
import Konva from "konva";
import { Grid } from "semantic-ui-react";
import { HomePageContext } from "../../../models/HomeContext";
import { NodeShapeTypes, NodeObj } from "../../../models/graph";

export default function Graph() {
  const { graph } = useContext(HomePageContext);

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
  return (
    <Grid.Column width={12}>
      <Stage width={window.innerWidth / 2} height={400}>
        <Layer>
          <Text fontSize={20} text={graph?.selectedGraph?.description ?? ""} />
          {graph?.selectedGraph?.nodes.map((n, index) => renderShape(n, index))}
        </Layer>
      </Stage>
    </Grid.Column>
  );
}
