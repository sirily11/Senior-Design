import React, { useState, useContext } from "react";
import { Grid, GridRow, GridColumn, Popup } from "semantic-ui-react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Stepper,
  StepLabel,
  makeStyles,
  Button,
  Step,
  StepContent
} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";

import { MaterialPicker, ChromePicker } from "react-color";
import { HomePageContext } from "../../../../models/HomepageContext";
import { NodeObj, NodeTypes } from "../../../../models/graphs/interfaces";
import BaseNode from "../../../../models/graphs/base_node";
import {
  JustificationNode,
  AssumptionNode
} from "../../../../models/graphs/gsn";
import {
  GoalNode,
  SolutionNode,
  ContextNode
} from "../../../../models/graphs/gsn";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  }
}));

export default function EditPanel() {
  const classes = useStyles();
  const [activeStep, setStep] = useState(0);
  const {
    currentNode,
    updateCurrentNode,
    graph: currentSelectedGraph,
    graph,
    update,
    setOpenAddNode
  } = useContext(HomePageContext);

  const [title, setTitle] = useState(currentNode?.title);

  const buttons = (
    <div className={classes.actionsContainer}>
      <div>
        <Button
          disabled={activeStep === 0}
          onClick={() => {
            setStep(activeStep - 1);
          }}
          className={classes.button}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={title === undefined}
          onClick={async () => {
            if (activeStep === 0) {
              // updateCurrentNode(node);
            } else if (activeStep === 1) {
              let newNode = graph.selectedGraph?.addNode(currentNode);
              update();
              if (newNode) {
                updateCurrentNode(newNode);
                graph.addNode(newNode.save() as NodeObj);
              }
              setOpenAddNode(false);
            }
            setStep(activeStep + 1);
          }}
          className={classes.button}
        >
          {activeStep === 1 ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  );

  const step1 = (
    <Grid style={{ paddingLeft: 20, width: "100%" }}>
      <GridRow>
        <Grid.Column>
          <TextField
            label="Node Text"
            value={title ?? ""}
            fullWidth
            onChange={e => {
              setTitle(e.target.value);
              currentNode.title = e.target.value;
              updateCurrentNode(currentNode);
            }}
          />
        </Grid.Column>
      </GridRow>
      <Grid.Row>
        <Grid.Column>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Shape</InputLabel>
            <Select
              value={currentNode.nodeType}
              fullWidth
              onChange={e => {
                let nodeTypes: NodeTypes = e.target.value as NodeTypes;
                let node: BaseNode | undefined = undefined;

                if (nodeTypes === NodeTypes.basenode) {
                  node = new BaseNode({
                    id: uuidv4(),
                    connection: [],
                    nodeType: nodeTypes,
                    description: "",
                    title: title
                  });
                } else if (nodeTypes === NodeTypes.goal) {
                  node = new GoalNode({
                    id: uuidv4(),
                    connection: [],
                    nodeType: nodeTypes,
                    description: "",
                    title: title
                  });
                } else if (nodeTypes === NodeTypes.solution) {
                  node = new SolutionNode({
                    id: uuidv4(),
                    connection: [],
                    nodeType: nodeTypes,
                    description: "",
                    title: title
                  });
                } else if (nodeTypes === NodeTypes.context) {
                  node = new ContextNode({
                    id: uuidv4(),
                    connection: [],
                    nodeType: nodeTypes,
                    description: "",
                    title: title
                  });
                } else if (nodeTypes === NodeTypes.justification) {
                  node = new JustificationNode({
                    id: uuidv4(),
                    connection: [],
                    nodeType: nodeTypes,
                    description: "",
                    title: title
                  });
                } else if (nodeTypes === NodeTypes.assumption) {
                  node = new AssumptionNode({
                    id: uuidv4(),
                    connection: [],
                    nodeType: nodeTypes,
                    description: "",
                    title: title
                  });
                }
                if (node) {
                  updateCurrentNode(node);
                }
              }}
            >
              {Object.values(NodeTypes).map(s => (
                <MenuItem value={s} id={s} key={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );

  const step2 = (
    <Grid style={{ paddingLeft: 20, width: "100%" }}>
      <GridRow>
        <Grid.Column>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Parent</InputLabel>
            <Select
              value={currentNode.parent?.id ?? -1}
              fullWidth
              onChange={e => {
                let id = e.target.value as string;
                let foundNodes = currentSelectedGraph.selectedGraph?.nodes.filter(
                  n => n.id === id
                );
                if (foundNodes) {
                  currentNode.parent = foundNodes[0];
                }
                updateCurrentNode(currentNode);
              }}
            >
              {currentSelectedGraph.selectedGraph?.nodes.map(s => (
                <MenuItem value={s.id} key={s.title}>
                  {s.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid.Column>
      </GridRow>
    </Grid>
  );

  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      <Step>
        <StepLabel>Set Up Type</StepLabel>
        <StepContent>
          {step1}
          {buttons}
        </StepContent>
      </Step>
      <Step>
        <StepLabel>Set Up Parent</StepLabel>
        <StepContent>
          {step2}
          {buttons}
        </StepContent>
      </Step>
    </Stepper>
  );
}
