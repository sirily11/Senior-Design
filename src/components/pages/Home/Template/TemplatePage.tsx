import React from "react";
import { Grid } from "semantic-ui-react";
import VerticalLinearStepper from "./components/EditPanel";
import GraphDisplay from "./components/GraphDisplay";
import Template from "./components/Template";

export default function TemplatePage() {
  return (
    <div>
      <Grid divided>
        <Grid.Row>
          <Grid.Column width={8}>
            <VerticalLinearStepper />
          </Grid.Column>
          <Grid.Column width={8}>
            <Template></Template>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
