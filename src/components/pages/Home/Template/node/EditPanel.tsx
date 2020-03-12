import React, { useContext, useState } from "react";
import { Theme, createStyles } from "@material-ui/core/styles";
import { Grid, GridRow } from "semantic-ui-react";
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
import { HomePageContext } from "../../../../models/HomepageContext";
import { NodeObj } from "../../../../models/graphs/interfaces";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);

export default function EditPanel() {
  const classes = useStyles();
  const [activeStep, setStep] = useState(0);
  const {
    updateCurrentNode,
    template,
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
              let node: NodeObj = {
                ...currentNode,
                title: title
              };
              updateCurrentNode(node);
            } else if (activeStep === 1) {
              await template.addNode(JSON.parse(JSON.stringify(currentNode)));
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
            label="Name"
            value={title}
            fullWidth
            onChange={e => setTitle(e.target.value)}
          />
        </Grid.Column>
      </GridRow>
    </Grid>
  );

  const step2 = (
    <Grid style={{ paddingLeft: 20, width: "100%" }}>
      <Grid.Row>
        <Grid.Column>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Template</InputLabel>
            <Select
              value={currentNode.shape.shape}
              fullWidth
              onChange={e => {
                var newNode: NodeObj = { ...currentNode };
                newNode.shape.shape = e.target.value as NodeShapeTypes;
                updateCurrentNode(newNode);
              }}
            >
              {["Template 1"].map(s => (
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

  return (
    <Grid style={{ paddingLeft: 20, width: "100%" }}>
      <Grid.Row>
        <Grid.Column>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Template</InputLabel>
            <Select
              value={currentNode.shape.shape}
              fullWidth
              onChange={e => {
                var newNode: NodeObj = { ...currentNode };
                newNode.shape.shape = e.target.value as NodeShapeTypes;
                updateCurrentNode(newNode);
              }}
            >
              {["Template 1"].map(s => (
                <MenuItem value={s} id={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
            <Button
              variant="contained"
              color="primary"
              disabled={title === ""}
              onClick={async () => {
                if (activeStep === 0) {
                  let node: NodeObj = {
                    ...currentNode,
                    title: title
                  };
                  updateCurrentNode(node);
                } else if (activeStep === 1) {
                  await template.addNode(
                    JSON.parse(JSON.stringify(currentNode))
                  );
                  update();
                  setOpenAddNode(false);
                }
                setStep(activeStep + 1);
              }}
              className={classes.button}
            >
              {"Finish"}
            </Button>
          </FormControl>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
