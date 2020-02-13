import React from 'react'
import { Grid } from "semantic-ui-react";
import VerticalLinearStepper from "./components/EditPanel";

export default function TemplatePage() {
    return (
        <div>
            <Grid>

            <Grid.Row> 
            <Grid.Column width={8}>
                <VerticalLinearStepper/>


            </Grid.Column>
            <Grid.Column width={8}>
                <VerticalLinearStepper/>


            </Grid.Column>
        /</Grid.Row>

        </Grid>


        </div>


    )
}
