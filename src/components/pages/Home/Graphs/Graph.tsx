import React, { useContext } from "react";

import { Stage, Layer, Rect, Text } from "react-konva";
import Konva from "konva";
import { Grid } from "semantic-ui-react";
import { HomePageContext } from "../../../models/HomeContext";

export default function Graph() {
  const { graph } = useContext(HomePageContext);

  return (
    <Grid.Column>
      <Stage width={window.innerWidth / 2} height={800}>
        <Layer>
          <Text
            fontSize={20}
            text={graph.selectedGraph ? graph.selectedGraph.description : ""}
          />
          <Rect
            x={50}
            y={20}
            width={250}
            height={250}
            fill={Konva.Util.getRandomColor()}
            shadowBlur={5}
          />
        </Layer>
      </Stage>
    </Grid.Column>
  );
}
