import React, { useContext, useState } from "react";
import { Rnd } from "react-rnd";
import { Grid, Button, Modal } from "semantic-ui-react";
import { HomePageContext } from "../../../models/HomeContext";
import { Schema, Widget } from "../../../utils/JSONSchema/model/Schema";
import { JSONSchema } from "../../../utils/JSONSchema";
import { Shape } from "../../../models/graph";
import GraphNodeEditingPage from "./node/GraphNodeEditingPage";

const style: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
  zIndex: 10,
  position: "absolute"
};

export default function GraphToolArea() {
  const { graph, update } = useContext(HomePageContext);
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setheight] = useState(window.innerHeight);
  const [hasUpdate, setHasUpdate] = useState(false);

  if (!hasUpdate) {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
      setheight(window.innerHeight);
      setHasUpdate(true);
      console.log("re");
    });
  }

  return (
    <Rnd
      style={style}
      disableDragging={true}
      default={{
        x: width - 400,
        y: 10,
        width: 320,
        height: 200
      }}
    >
      <Grid columns={4}>
        <Button
          icon="add"
          circular
          disabled={graph.selectedGraph === undefined}
          onClick={() => {
            setOpen(true);
          }}
        ></Button>
        <Modal open={true} onClose={() => setOpen(false)}>
          <Modal.Header>
            <div>Add New Node</div>
          </Modal.Header>
          <Modal.Content>
            <GraphNodeEditingPage></GraphNodeEditingPage>
          </Modal.Content>
        </Modal>
      </Grid>
    </Rnd>
  );
}
