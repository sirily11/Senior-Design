import { Grid,
        Label, 
        Segment,
        Divider} from "semantic-ui-react";
import Template from "./components/Template"
import {HomePageContext} from "../../../models/HomeContext"
import React, { useContext } from "react";
import TemplateInfo from "./components/TemplateInfo";
import TemplateToolArea from "./components/TemplateToolArea"
import TemplateActions from "./components/TemplateActions"

export default function TemplatePage() {
    const { template } = useContext(HomePageContext);
    return (
        <div>
        <Grid>
            <Segment placeholder>
            <Grid.Row> 
                <TemplateActions></TemplateActions>
                <Divider></Divider>
                <TemplateInfo></TemplateInfo>
            </Grid.Row>
        </Segment>
        <Template></Template>
        {template.selectedTemplate && (
          <Label as="h4" color="blue" attached="bottom">
            Template: {template.selectedTemplate?.name}
          </Label>
        )}
        </Grid>
        <TemplateToolArea></TemplateToolArea>
        </div>
    )
}
