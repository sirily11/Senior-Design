import React, { useState } from "react";
import { Tab } from "semantic-ui-react";
import DocsView from "../../utils/docs-generator/DocsView";
import GraphPage from "./Graphs/GraphPage";
import { docs } from "./Introductions/document";
import TemplatePage from "./Template/TemplatePage";

/**
 * Navigation between different pages
 */
export default function Tabs() {
  const panes = [
    {
      menuItem: "Introduction",
      render: () => (
        <Tab.Pane attached={false}>
          <DocsView docs={docs}></DocsView>
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
    }, {
      menuItem: "Templates",
      render: () => (
        <Tab.Pane attached={false}>
         <TemplatePage/>
        </Tab.Pane>
      )
    }
  ];

  return <Tab menu={{ secondary: true }} panes={panes} />;
}
