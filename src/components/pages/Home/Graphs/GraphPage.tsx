import React, { useContext } from "react";
import {
  Sidebar,
  Menu,
  Icon,
  Button,
  Modal,
  Header,
  GridColumn,
  Segment,
  Label
} from "semantic-ui-react";
import { JSONSchema } from "../../../utils/JSONSchema";
import { Schema, Widget } from "../../../utils/JSONSchema/model/Schema";
import { Stage, Layer, Rect, Text } from "react-konva";
import Konva from "konva";
import GraphActions from "./components/GraphActions";
import Graph from "./components/Graph";
import GraphInfo from "./components/GraphInfo";
import GraphToolArea from "./components/GraphToolArea";
import { HomePageContext } from "../../../models/HomepageContext";
import Grid from "@material-ui/core/Grid";
import { Divider } from "@material-ui/core";

export default function GraphPage() {
  const { graph } = useContext(HomePageContext);
  return (
    <div>
      <Grid container>
        <Segment placeholder>
          <Grid container>
            <GraphActions></GraphActions>
            <Grid item xs={12}>
              {" "}
              <Divider />
            </Grid>
            <GraphInfo></GraphInfo>
          </Grid>
        </Segment>
        <Graph></Graph>
        {graph.selectedGraph && (
          <Label as="h4" color="blue" attached="bottom">
            Graph: {graph.selectedGraph?.name}
          </Label>
        )}
      </Grid>
      <GraphToolArea></GraphToolArea>
    </div>
  );
}
