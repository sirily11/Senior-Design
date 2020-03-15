import React from "react";
import { Grid } from "semantic-ui-react";
import VerticalLinearStepper from "./components/EditPanel";
import GraphDisplay from "./components/GraphDisplay";

export default function TemplatePage() {
  return (
    <div>
      <Grid divided>
        <Grid.Row>
          <Grid.Column width={4}>
            <VerticalLinearStepper />
          </Grid.Column>
          <Grid.Column width={12}>
            <GraphDisplay />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
