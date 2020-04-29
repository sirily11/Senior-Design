import React, { useContext } from "react";

import { Stage, Layer, Rect, Text, Circle } from "react-konva";
import Konva from "konva";
import { Grid } from "semantic-ui-react";
import { HomePageContext } from "../../../../models/HomepageContext";
import { NodeObj } from "../../../../models/graphs/interfaces";

export default function Graph() {
  const {
    graph,
    showOpenAddNode,
    updateCurrentNode,
    currentNode,
    setOpenAddNode
  } = useContext(HomePageContext);

  return (
    <Grid.Column width={12} id="graph" style={{ cursor: "grab" }}>
      <Stage width={window.innerWidth - 200} height={600}>
        {graph?.selectedGraph?.render({
          onClick: node => {
            updateCurrentNode(node);
            setOpenAddNode(true);
          }
        })}
      </Stage>
    </Grid.Column>
  );
}
