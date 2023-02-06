import * as React from 'react';
import { Typography, Link, Breadcrumbs, Stepper, Step, StepLabel, Paper, Box, Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import fundService from '../../../services/funds';
import Page from '../../../components/Page';

import Step01Overview from './step_01_overview';
import Step02Subdoc from './step_02_subdoc';
import Step03NextSteps from './step_03_next_steps';

const STEPS = {
  0: Step01Overview,
  1: Step02Subdoc,
  2: Step03NextSteps,
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(4),
  }
}));

function FundSubscriptionPage() {
  const { fundId } = useParams();
  const classes = useStyles();
  const [step, setStep] = React.useState(0);
  const [fund, setFund] = React.useState(null);
  const StepComponent = STEPS[step];

  React.useEffect(() => {
    fundService.getFund({ fundId }).then((data) => {
      setFund(data);
    });
  }, []);

  if (!fund) {
    return (
      <Page>
        Loading...
      </Page>
    );
  }

  return (
    <Page>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          color="inherit"
          href="/"
        >
          All oportunities
        </Link>
        <Typography color="primary">{fund?.name}</Typography>
      </Breadcrumbs>

      <Paper variant="outlined" className={classes.paper}>
        <Typography variant="h6">
          {fund?.name}
        </Typography>

        {step !== 2 ? (
          <Stepper activeStep={step}>
            <Step>
              <StepLabel>Overview</StepLabel>
            </Step>
            <Step>
              <StepLabel>Subscription document</StepLabel>
            </Step>
            <Step>
              <StepLabel>Next steps</StepLabel>
            </Step>
          </Stepper>
        ) : null}

        <StepComponent />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {step === 0 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setStep(step + 1)}
            >
              Next
            </Button>
          ) : null}

          {step === 2 ? (
            <Button
              variant="contained"
              href="/"
            >
              See more funds
            </Button>
          ) : null}
        </Box>
      </Paper>
    </Page>
  );
}

export default FundSubscriptionPage;
