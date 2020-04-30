import React, { useContext } from "react";
import { Label } from "semantic-ui-react";
import { HomePageContext } from "../../../../models/HomepageContext";
import Grid from "@material-ui/core/Grid";

export default function GraphInfo() {
  const { graph, update } = useContext(HomePageContext);

  return (
    <Grid item xs={6} style={{ marginTop: 20 }}>
      <Grid container>
        {graph.graphs.map(g => (
          <Label
            style={{ marginTop: 10 }}
            as="a"
            onClick={() => {
              graph.selectGraph(g);
              update();
            }}
          >
            {g.name}
          </Label>
        ))}
      </Grid>
    </Grid>
  );
}
