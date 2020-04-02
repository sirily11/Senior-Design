import React, { useContext, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { TemplatePageContext } from "../../../../models/TemplatePageContext";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import { Divider } from "semantic-ui-react";
import { HomePageContext } from "../../../../models/HomepageContext";

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

function getSteps() {
  return ["Basic Info", "Select Template", "Final Check"];
}

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const templateContext = useContext(TemplatePageContext);
  const [name, setname] = useState("My graph");
  const [description, setdescription] = useState("My Description");
  const homeContext = useContext(HomePageContext);

  const handleNext = async () => {

    if (activeStep === steps.length - 1) {
      if (templateContext.graph.selectedGraph) {
        let g = await templateContext.graph.addGraph(
          name,
          description,
          templateContext.graph.selectedGraph
        );
        homeContext.graph.graphs.push(g);
      }
      templateContext.update();
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getStepContent(step: number): JSX.Element {
    switch (step) {
      case 0:
        return (
          <form>
            <TextField
              label="Graph Name"
              fullWidth
              value={name}
              onChange={e => setname(e.target.value)}
            />
            <TextField
              label="Graph Description"
              rows={3}
              multiline
              fullWidth
              value={description}
              onChange={e => setdescription(e.target.value)}
            />
          </form>
        );
      case 1:
        return (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select your template
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={templateContext.graph.selectedGraph?._id ?? 0}
              onChange={e => {
                templateContext.graph.selectGraph(
                  templateContext.graph.graphs.filter(
                    v => v._id === e.target.value
                  )[0]
                );
                templateContext.update();
              }}
            >
              {templateContext.graph.graphs.map(g => (
                <MenuItem value={g._id} key={g._id}>
                  {g.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      default:
        return (
          <div>
            <span>Your config</span>
            <Divider></Divider>
            <div>
              <b>Title: </b>
              {name}
              <br />
              <b>Description: </b>
              {description} <br />
              <b>Selected Template: </b>
              {templateContext.graph.selectedGraph?.name}
            </div>
          </div>
        );
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}
