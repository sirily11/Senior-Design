import React from 'react'
import { Tab } from 'semantic-ui-react'
import DocsView from "../../utils/docs-generator/DocsView";
import GraphPage from './Graphs/GraphPage';
import { docs } from "./Introductions/document"


/**
 * Navigation between different pages
 */
export default function Tabs() {
    const panes = [
        {
          menuItem: 'Introduction',
          render: () => <Tab.Pane attached={false}><DocsView docs={docs} ></DocsView></Tab.Pane>,
        },
        {
          menuItem: 'Graph',
          render: () => <Tab.Pane attached={false}><GraphPage></GraphPage></Tab.Pane>,
        },
        
      ]
    
    return (
        <Tab menu={{ secondary: true }} panes={panes} />
    )
}
