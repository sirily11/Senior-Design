import React from 'react'
import { Tab } from 'semantic-ui-react'
import DocsView from "../../utils/docs-generator/DocsView";


/**
 * Navigation between different pages
 */
export default function Tabs() {
    const panes = [
        {
          menuItem: 'Introduction',
          render: () => <Tab.Pane attached={false}><DocsView path="/Users/sirily11/Desktop/Senior-Design/src/components/pages/Home/Introductions"></DocsView></Tab.Pane>,
        },
        {
          menuItem: 'Tab 2',
          render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
        },
        {
          menuItem: 'Docs',
          render: () => <Tab.Pane attached={false}><DocsView path="/Users/sirily11/Desktop/Senior-Design/src/components/utils/docs"></DocsView></Tab.Pane>,
        },
      ]
    
    return (
        <Tab menu={{ secondary: true }} panes={panes} />
    )
}
