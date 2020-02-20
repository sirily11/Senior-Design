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

import { MaterialPicker, ChromePicker } from "react-color";
import { HomePageContext } from "../../../../models/HomepageContext";
import { NodeObj, NodeShapeTypes } from "../../../../models/interfaces";

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
    graph,
    update,
    setOpenAddNode
  } = useContext(HomePageContext);
  const [title, setTitle] = useState(currentNode?.title);
  const [color, setColor] = useState(currentNode?.shape?.color);

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
              let node: NodeObj = {
                ...currentNode,
                title: title
              };
              updateCurrentNode(node);
            } else if (activeStep === 1) {
              await graph.addNode(JSON.parse(JSON.stringify(currentNode)));
              update();
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
            value={title}
            fullWidth
            onChange={e => setTitle(e.target.value)}
          />
        </Grid.Column>
      </GridRow>
      <Grid.Row>
        <Grid.Column>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Shape</InputLabel>
            <Select
              value={currentNode.shape.shape}
              fullWidth
              onChange={e => {
                var newNode: NodeObj = { ...currentNode };
                newNode.shape.shape = e.target.value as NodeShapeTypes;
                updateCurrentNode(newNode);
              }}
            >
              {["circle", "rect", "star"].map(s => (
                <MenuItem value={s} id={s}>
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
          <ChromePicker
            color={currentNode?.shape?.color}
            onChange={v => {
              var newNode: NodeObj = { ...currentNode };
              newNode.shape.color = v.hex;
              updateCurrentNode(newNode);
            }}
          ></ChromePicker>
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
        <StepLabel>Set Up Color</StepLabel>
        <StepContent>
          {step2}
          {buttons}
        </StepContent>
      </Step>
    </Stepper>
  );
}
