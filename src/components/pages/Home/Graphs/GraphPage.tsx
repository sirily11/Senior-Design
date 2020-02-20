import React, { useContext } from "react";
import {
  Grid,
  Sidebar,
  Menu,
  Icon,
  Button,
  Modal,
  Header,
  GridColumn,
  Divider,
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


export default function GraphPage() {
  const { graph } = useContext(HomePageContext);
  return (
    <div>
      <Grid>
        <Segment placeholder>
          <Grid.Row>
            <GraphActions></GraphActions>
            <Divider></Divider>
            <GraphInfo></GraphInfo>
          </Grid.Row>
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
