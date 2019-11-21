import React from "react";
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
  Segment
} from "semantic-ui-react";
import { JSONSchema } from "../../../utils/JSONSchema";
import { Schema, Widget } from "../../../utils/JSONSchema/model/Schema";
import { Stage, Layer, Rect, Text } from "react-konva";
import Konva from "konva";
import GraphActions from "./GraphActions";
import Graph from "./Graph";
import GraphInfo from "./GraphInfo";

export default function GraphPage() {
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
      </Grid>
    </div>
  );
}
