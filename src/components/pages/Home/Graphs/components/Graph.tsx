import React, { useContext } from "react";

import { Stage, Layer, Rect, Text, Circle } from "react-konva";
import Konva from "konva";
import { Grid } from "semantic-ui-react";
import { HomePageContext } from "../../../../models/HomepageContext";
import { NodeObj } from "../../../../models/graphs/interfaces";


export default function Graph() {
  const { graph } = useContext(HomePageContext);

  return (
    <Grid.Column width={12}>
      <Stage width={window.innerWidth / 2} height={600}>
        <Layer>
          {graph?.selectedGraph?.nodes.map((n, index) => n.render())}
        </Layer>
      </Stage>
    </Grid.Column>
  );
}
