import React, { useState, useContext } from "react";

import { Grid } from "semantic-ui-react";
import ShapeDisplay from "./ShapeDisplay";
import EditPanel from "./EditPanel";
import { NodeObj } from "../../../../models/graphs/interfaces";
import { HomePageContext } from "../../../../models/HomepageContext";

/// This file will be the display for the graph node editing
/// It will be shown when user click add node button
/// Or Editing Node button

interface Props {
  node?: NodeObj;
}

export default function GraphNodeEditingPage(props: Props) {
  const { showOpenAddNode } = useContext(HomePageContext);

  return (
    <Grid celled="internally">
      <Grid.Column width="6">
        <ShapeDisplay />
      </Grid.Column>
      <Grid.Column width="10">
        {showOpenAddNode && <EditPanel></EditPanel>}
      </Grid.Column>
    </Grid>
  );
}
