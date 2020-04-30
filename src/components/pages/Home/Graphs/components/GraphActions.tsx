import React, { useContext, useState } from "react";
import { Grid, Modal, Button } from "semantic-ui-react";
import { JSONSchema } from "../../../../utils/JSONSchema";
import { Schema, Widget } from "../../../../utils/JSONSchema/model/Schema";
import { HomePageContext } from "../../../../models/HomepageContext";

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
  const { graph, update } = useContext(HomePageContext);
  const [open, setOpen] = useState(false);

  return (
    <Grid.Column computer={6}>
      <Grid.Row style={{ paddingBottom: 10 }}>
        <Button
          style={{ marginBottom: 10 }}
          onClick={async () => {
            const a = document.createElement("a");
            let graphs = await graph.getAllGraph();
            var file = new Blob([JSON.stringify(graphs.map(g => g.save()))], {
              type: "json"
            });
            a.href = URL.createObjectURL(file);
            a.download = "output.json";
            a.click();
          }}
        >
          Export Database
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          trigger={
            <Button onClick={() => setOpen(true)}>Create new graph</Button>
          }
        >
          <Modal.Header>Create New Graph</Modal.Header>
          <Modal.Description style={{ margin: "10px", padding: "10px" }}>
            <JSONSchema
              schemas={schemas}
              url=""
              onSubmit={async data => {
                let newGraph = await graph.addGraph(data["name"], data["description"]);
                let graphs = await graph.getAllGraph()
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
