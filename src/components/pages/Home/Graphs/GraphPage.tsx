import React from "react";
import { Grid, Sidebar, Menu, Icon, Button } from "semantic-ui-react";

export default function GraphPage() {
  return (
    <div>
      <Grid>
        <Grid.Column>
          <Grid.Row style={{paddingBottom: 10}}>
            <Button primary>Create new one</Button>
          </Grid.Row>
          <Grid.Row>
            <Button primary>Use existing one</Button>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </div>
  );
}
