import React, { useState, useContext } from "react";

import { Grid } from "semantic-ui-react";
import TemplateDisplay from "./TemplateDisplay";
import EditPanel from "./EditPanel";
import { NodeObj } from "../../../../models/interfaces";
import { HomePageContext } from "../../../../models/HomepageContext";

/// This file will be the display for the graph node editing
/// It will be shown when user click add node button
/// Or Editing Node button

interface Props {
  node?: NodeObj;
}

export default function TemplateNodeEditingPage(props: Props) {
  const { currentNode } = useContext(HomePageContext);

  return (
    <Grid celled="internally">
      <Grid.Column width="6">
        <TemplateDisplay shape={currentNode?.shape}></TemplateDisplay>
      </Grid.Column>
      <Grid.Column width="10">
        <EditPanel></EditPanel>
      </Grid.Column>
    </Grid>
  );
}