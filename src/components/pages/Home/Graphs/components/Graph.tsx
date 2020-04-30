import React, { useContext } from "react";

import { Stage, Layer, Rect, Text, Circle } from "react-konva";
import Konva from "konva";
import { HomePageContext } from "../../../../models/HomepageContext";
import { NodeObj } from "../../../../models/graphs/interfaces";
import Grid from "@material-ui/core/Grid";

export default function Graph() {
  const {
    graph,
    showOpenAddNode,
    updateCurrentNode,
    currentNode,
    setOpenAddNode
  } = useContext(HomePageContext);

  return (
    <Grid item xs={6} id="graph" style={{ cursor: "grab" }}>
      <Stage width={window.innerWidth - 200} height={600}>
        {graph?.selectedGraph?.render({
          onClick: node => {
            updateCurrentNode(node);
            setOpenAddNode(true);
          }
        })}
      </Stage>
    </Grid>
  );
}
