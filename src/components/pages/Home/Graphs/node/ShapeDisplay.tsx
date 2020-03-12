import React from "react";
import { Stage, Layer, Star, Text, Circle, Rect } from "react-konva";
import { Shape } from "../../../../models/graphs/interfaces";

/// This file will display the shpae
/// When user select shape from GraphNodeEditor
///
const width = 40;
const height = 40;
const x = 50;
const y = 50;

export default function ShapeDisplay(props: { shape: Shape | undefined }) {
 

  return (
    <Stage width={400} height={400}>
      {/* <Layer>{renderShape(props.shape?.shape)}</Layer> */}
    </Stage>
  );
}
