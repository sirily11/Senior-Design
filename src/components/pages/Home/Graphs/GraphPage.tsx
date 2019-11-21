import React from "react";
import {
  Grid,
  Sidebar,
  Menu,
  Icon,
  Button,
  Modal,
  Header,
  GridColumn
} from "semantic-ui-react";
import { JSONSchema } from "../../../utils/JSONSchema";
import { Schema, Widget } from "../../../utils/JSONSchema/model/Schema";
import { Stage, Layer, Rect, Text } from "react-konva";
import Konva from "konva";

const schemas: Schema[] = [
  {
    name: "name",
    label: "Name",
    readonly: false,
    required: true,
    widget: Widget.text
  },
  {
    name: "description",
    label: "Description",
    readonly: false,
    required: true,
    widget: Widget.text
  }
];

export default function GraphPage() {
  return (
    <div>
      <Grid>
        <Grid.Column>
          <Grid.Row style={{ paddingBottom: 10 }}>
            <Modal trigger={<Button>Show Modal</Button>}>
              <Modal.Header>Select a Photo</Modal.Header>
                <Modal.Description>
                  <JSONSchema schemas={schemas} url=""></JSONSchema>
                </Modal.Description>
            </Modal>
          </Grid.Row>
          <Grid.Row>
            <Button primary>Use existing one</Button>
          </Grid.Row>
        </Grid.Column>
        <Stage width={window.innerWidth /2} height={window.innerHeight}>
          <Layer>
            <Text text="Try click on rect" />
            <Rect
              x={50}
              y={20}
              width={250}
              height={250}
              fill={Konva.Util.getRandomColor()}
              shadowBlur={5}
            />
          </Layer>
        </Stage>
      </Grid>
    </div>
  );
}
