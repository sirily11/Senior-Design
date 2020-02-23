import React, { useContext, useState } from "react";
import { Grid, Modal, Button } from "semantic-ui-react";
import { JSONSchema } from "../../../../utils/JSONSchema";
import { Schema, Widget } from "../../../../utils/JSONSchema/model/Schema";
import { HomePageContext } from "../../../../models/HomeContext";

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

export default function GraphActions() {
  const { template, update } = useContext(HomePageContext);
  const [open, setOpen] = useState(false);

  return (
    <Grid.Column computer={6}>
      <Grid.Row style={{ paddingBottom: 10 }}>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          trigger={
            <Button onClick={() => setOpen(true)}>Create New Template</Button>
          }
        >
          <Modal.Header>Create New Template</Modal.Header>
          <Modal.Description style={{ margin: "10px", padding: "10px" }}>
            <JSONSchema
              schemas={schemas}
              url=""
              onSubmit={async data => {
                await template.addTemplate(data["name"], data["description"]);
                update();
                setOpen(false);
              }}
            ></JSONSchema>
          </Modal.Description>
        </Modal>
      </Grid.Row>
    </Grid.Column>
  );
}
