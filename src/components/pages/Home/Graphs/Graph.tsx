import React, { useContext } from "react";

import { Stage, Layer, Rect, Text } from "react-konva";
import Konva from "konva";
import { Grid } from "semantic-ui-react";
import { HomePageContext } from "../../../models/HomeContext";

export default function Graph() {
  const { graph } = useContext(HomePageContext);

  return (
    <Grid.Column>
      <Stage width={window.innerWidth / 2} height={400}>
        <Layer>
          <Text
            fontSize={20}
            text={graph.selectedGraph ? graph.selectedGraph.description : ""}
          />
          {graph.selectedGraph &&
            graph.selectedGraph.nodes &&
            graph.selectedGraph.nodes.map(n => (
              <Rect
                x={n.x}
                y={n.y}
                width={n.width}
                height={n.height}
                fill={Konva.Util.getRandomColor()}
                shadowBlur={5}
              />
            ))}
        </Layer>
      </Stage>
    </Grid.Column>
  );
}
