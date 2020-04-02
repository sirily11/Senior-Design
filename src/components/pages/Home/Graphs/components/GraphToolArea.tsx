import React, { useContext, useState } from "react";
import { Rnd } from "react-rnd";
import { Grid, Button, Modal } from "semantic-ui-react";
import { Schema, Widget } from "../../../../utils/JSONSchema/model/Schema";
import { JSONSchema } from "../../../../utils/JSONSchema";
import GraphNodeEditingPage from "../node/GraphNodeEditingPage";
import { HomePageContext } from "../../../../models/HomepageContext";
import { Tooltip } from "@material-ui/core";
import jsPDF from "jspdf";

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
  const { graph, update, showOpenAddNode, setOpenAddNode } = useContext(
    HomePageContext
  );
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setheight] = useState(window.innerHeight);
  const [hasUpdate, setHasUpdate] = useState(false);

  if (!hasUpdate) {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
      setheight(window.innerHeight);
      setHasUpdate(true);
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
        <Tooltip title="Add Node">
          <Button
            icon="add"
            circular
            disabled={graph.selectedGraph === undefined}
            onClick={() => {
              setOpenAddNode(true);
            }}
          />
        </Tooltip>
        <Tooltip title="Delete Graph">
          <Button
            icon="trash"
            circular
            disabled={graph.selectedGraph === undefined}
            onClick={async () => {
              let confirm = window.confirm("Do you want to delete?");
              if (confirm && graph.selectedGraph) {
                await graph.deleteGraph(graph.selectedGraph);

                update();
              }
            }}
          />
        </Tooltip>
        <Tooltip title="Export to pdf">
          <Button
            icon="file pdf outline"
            circular
            disabled={graph.selectedGraph === undefined}
            onClick={async () => {
              let doc = new jsPDF();
              let graph = document.getElementById("graph");
              if (graph) {
                console.log(graph);
                doc.fromHTML(graph, 15, 15, {
                  width: "550px",
                  height: "550px"
                });
                doc.save("try.pdf");
              }
            }}
          />
        </Tooltip>
        <Modal open={showOpenAddNode} onClose={() => setOpenAddNode(false)}>
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
