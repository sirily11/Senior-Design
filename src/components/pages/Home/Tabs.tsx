import React, { useState } from "react";
import { Tab } from "semantic-ui-react";
import GraphPage from "./Graphs/GraphPage";
import TemplatePage from "./Template/TemplatePage";
import Introduction from "./Introductions/Introduction";

/**
 * Navigation between different pages
 */
export default function Tabs() {
  const panes = [
    {
      menuItem: "Introduction",
      render: () => (
        <Tab.Pane attached={false}>
          <Introduction />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Graph",
      render: () => (
        <Tab.Pane attached={false}>
          <GraphPage></GraphPage>
        </Tab.Pane>
      )
    },
    {
      menuItem: "Templates",
      render: () => (
        <Tab.Pane attached={false}>
          <TemplatePage />
        </Tab.Pane>
      )
    }
  ];

  return <Tab menu={{ secondary: true }} panes={panes} />;
}
