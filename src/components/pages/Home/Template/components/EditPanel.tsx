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
  const homeContext = useContext(HomePageContext);
  const [description, setdescription] = useState("My Description");
  const [safetyFeature, setSafetyFeature] = useState("My Safety Feature");
  const [generalAssumption, setGeneralAssumption] = useState(
    "My General Assumption"
  );
  const [generalEnvironment, setGeneralEnvironment] = useState(
    "My General Environment"
  );
  const [generalJustification, setGeneralJustification] = useState(
    "My General Justification"
  );
  const [goal, setSubGoal] = useState("My Sub-Goal");
  const [specificAssumption, setSpecificAssumption] = useState(
    "My Specific Assumption"
  );
  const [specificJustification, setSpecificJustification] = useState(
    "My Specific Justification"
  );

  const [argument, setArgument] = useState("My Argument");

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
      case 1:
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

            <Divider></Divider>

            <InputLabel id="demo-simple-select-label">
              Safety Feature
            </InputLabel>
            <Select
              label="Safety Feature"
              fullWidth
              value={safetyFeature}
              onChange={e => {
                templateContext.graph.selectedGraph?.safetyFeatureChangeDescription(
                  e.target.value as string,
                  "SAFETY_FEATURE"
                );
                setSafetyFeature(e.target.value as string);
                templateContext.update();
              }}
            >
              {["Kill-Switch", "Auxotrophy", "Degredation"].map(s => (
                <MenuItem value={s} id={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>

            <Divider></Divider>

            <InputLabel id="demo-simple-select-label">
              General Assumption
            </InputLabel>
            <Select
              label="General Assumption"
              fullWidth
              value={generalAssumption}
              onChange={e => {
                templateContext.graph.selectedGraph?.generalAssumptionChangeDescription(
                  e.target.value as string,
                  "GENERAL_ASSUMPTION"
                );
                setGeneralAssumption(e.target.value as string);
                templateContext.update();
              }}
            >
              {[
                "All threats to the environment\n have been identified.",
                "All threats to animal life have\n been identified.",
                "All threats to plant life have\n been identified.",
                "It is possible to detect evolution\n or mutation resulting in\n undesired or unwanted behavior."
              ].map(s => (
                <MenuItem value={s} id={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>

            <Divider></Divider>

            <InputLabel id="demo-simple-select-label">
              General Environment
            </InputLabel>
            <Select
              label="General Environment"
              fullWidth
              value={generalEnvironment}
              onChange={e => {
                templateContext.graph.selectedGraph?.generalEnvironmentChangeDescription(
                  e.target.value as string,
                  "GENERAL_ENVIRONMENT"
                );
                setGeneralEnvironment(e.target.value as string);
                templateContext.update();
              }}
            >
              {[
                "Only in the lab",
                "An industrial\n bioreactor",
                "The general\n environment",
                "Soil",
                "The water table",
                "The atmosphere",
                "Freshwater rivers\n or lakes",
                "Saltwater lakes or\n oceans",
                "A human gut"
              ].map(s => (
                <MenuItem value={s} id={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>

            <Divider></Divider>

            <InputLabel id="demo-simple-select-label">
                Argument
            </InputLabel>
            <Select
              label="Argument"
              fullWidth
              value={argument}
              onChange={e => {
                templateContext.graph.selectedGraph?.argumentChangeDescription(
                  e.target.value as string,
                  "ARGUMENT"
                );
                setArgument(e.target.value as string);
                templateContext.update();
              }}
            >
              {["Argument over\n the effectiveness\n of the hazard-\nmigration strategies\n for the " + safetyFeature].map(s => (
                <MenuItem value={s} id={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>

            <Divider></Divider>

            <InputLabel id="demo-simple-select-label">
              General Justification
            </InputLabel>
            <Select
              label="General Justification"
              fullWidth
              value={generalJustification}
              onChange={e => {
                templateContext.graph.selectedGraph?.generalJustificationChangeDescription(
                  e.target.value as string,
                  "GENERAL_JUSTIFICATION"
                );
                setGeneralJustification(e.target.value as string);
                templateContext.update();
              }}
            >
              {[
                "Our organisims only function\n in fresh water.",
                "Our organisms only function\n in salt water.",
                "Our organisms are not intended\n for release into the environment.",
                "Our organisms are designed to\n live within the human gut.",
                "Only the outputs from our\n organisms are intended for\n environmental application."
              ].map(s => (
                <MenuItem value={s} id={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>

            <Divider></Divider>

            <InputLabel id="demo-simple-select-label">Sub-Goal</InputLabel>
            <Select
              label="Sub-Goal"
              fullWidth
              value={goal}
              onChange={e => {
                templateContext.graph.selectedGraph?.subGoalChangeDescription(
                  e.target.value as string,
                  "SUB_GOAL"
                );
                setSubGoal(e.target.value as string);
                templateContext.update();
              }}
            >
              {[
                "Our " +
                  safetyFeature +
                  " operates\n effectively and when intended.",
                "Our " + safetyFeature + " operates safely.",
                "Our " +
                  safetyFeature +
                  " operates\n securely and is robust to external\n attacks."
              ].map(s => (
                <MenuItem value={s} id={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>

            <Divider></Divider>

            <InputLabel id="demo-simple-select-label">
              Specific Assumption
            </InputLabel>
            <Select
              label="Specific Assumption"
              fullWidth
              value={specificAssumption}
              onChange={e => {
                templateContext.graph.selectedGraph?.specificAssumptionChangeDescription(
                  e.target.value as string,
                  "SPECIFIC_ASSUMPTION"
                );
                setSpecificAssumption(e.target.value as string);
                templateContext.update();
              }}
            >
              {[
                "Our lab has adequate physical security.",
                "Everyone on our team has proper\n safety training.",
                "Our organisms and their outputs will\n not be used except for their intended\n application."
              ].map(s => (
                <MenuItem value={s} id={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>

            <Divider></Divider>

            <InputLabel id="demo-simple-select-label">
              Specific Justification
            </InputLabel>
            <Select
              label="Specific Justification"
              fullWidth
              value={specificJustification}
              onChange={e => {
                templateContext.graph.selectedGraph?.specificJustificationChangeDescription(
                  e.target.value as string,
                  "SPECIFIC_JUSTIFICATION"
                );
                setSpecificJustification(e.target.value as string);
                templateContext.update();
              }}
            >
              {[
                "Our organisms could evolve\n and exhibit unintended or undesirable\n behavior.",
                "Malicious actors could attempt to alter\n our organisms behavior."
              ].map(s => (
                <MenuItem value={s} id={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </form>
          
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
              <br />
              <b>Safety Feature: </b>
              {safetyFeature}
              <br />
              <b>General Assumption </b>
              {generalAssumption}
              <br />
              <b>General Environment</b>
              {generalEnvironment}
              <br />
              <b>General Justificaiton</b>
              {generalJustification}
              <br />
              <b>Sub-Goal</b>
              {goal}
              <br />
              <b>Specific Assumption</b>
              {specificAssumption}
              <br />
              <b>Specific Justification</b>
              {specificJustification}
              <br />
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
