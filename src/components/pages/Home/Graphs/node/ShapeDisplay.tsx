import React from "react";
import { Shape, NodeShapeTypes } from "../../../../models/graph";
import { Stage, Layer, Star, Text, Circle, Rect } from "react-konva";

/// This file will display the shpae
/// When user select shape from GraphNodeEditor
///
const width = 40;
const height = 40;
const x = 50;
const y = 50;

export default function ShapeDisplay(props: { shape: Shape | undefined }) {
  const renderShape = (shape: NodeShapeTypes | undefined) => {
    switch (shape) {
      case "circle":
        return (
          <Circle
            radius={width}
            x={x}
            y={y}
            fill={props.shape?.color ?? "green"}
          ></Circle>
        );
      default:
        return (
          <Rect
            width={width}
            height={height}
            x={x}
            y={y}
            fill={props.shape?.color ?? "green"}
          />
        );
    }
  };

  return (
    <Stage width={400} height={400}>
      <Layer>{renderShape(props.shape?.shape)}</Layer>
    </Stage>
  );
}
