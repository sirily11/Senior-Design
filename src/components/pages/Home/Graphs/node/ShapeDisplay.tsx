import React, { useContext } from "react";
import { Stage, Layer, Star, Text, Circle, Rect } from "react-konva";
import { Shape } from "../../../../models/graphs/interfaces";
import { HomePageContext } from "../../../../models/HomepageContext";

/// This file will display the shpae
/// When user select shape from GraphNodeEditor
///

export default function ShapeDisplay() {
  const { currentNode } = useContext(HomePageContext);
  return (
    <Stage width={400} height={400}>
      <Layer>{currentNode?.render(true)}</Layer>
    </Stage>
  );
}
