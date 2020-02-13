import React, { useContext } from "react";
import { HomePageContext } from "../../../../models/HomeContext";
import { Grid, Label } from "semantic-ui-react";

export default function GraphInfo() {
  const { graph, update } = useContext(HomePageContext);

  return (
    <Grid.Column computer={10}>
      {graph.graphs.map(g => (
        <Label
          as="a"
          onClick={() => {
            graph.selectGraph(g);
            update();
          }}
        >
          {g.name}
        </Label>
      ))}
    </Grid.Column>
  );
}
