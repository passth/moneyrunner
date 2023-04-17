import * as React from "react";
import {
  Typography,
  Link,
  Breadcrumbs,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  Paper,
} from "@material-ui/core";
import { useParams, useNavigate } from "react-router-dom";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import * as fundService from "services/funds";
import { Page } from "components/page";
import { SubscriptionOverview } from "components/subscription_overview";
import { SubscriptionPassthrough } from "components/subscription_passthrough";
import { SubscriptionNextSteps } from "components/subscription_next_steps";

const STEPS = {
  0: SubscriptionOverview,
  1: SubscriptionPassthrough,
  2: SubscriptionNextSteps,
};

export function SDKFundSubscription() {
  const { fundId } = useParams();
  const [step, setStep] = React.useState(0);
  const [fund, setFund] = React.useState(null);
  const [verticalNavigation, setVerticalNavigation] = React.useState(true);
  const navigate = useNavigate();
  const StepComponent = STEPS[step];

  React.useEffect(() => {
    fundService.getFund({ fundId }).then(({ data }: any) => {
      setFund(data);
      const isInProgress = ["unsent", "sent", "in_progress", "requested_changes"].includes(
        data.subscriptionStatus
      );

      if (!isInProgress) {
        setStep(2);
      }
    });
  }, []);

  if (!fund) {
    return <Page>Loading...</Page>;
  }

  const next = () => {
    if (STEPS[step + 1]) {
      setStep(step + 1);
    }
  };

  return (
    <Page size="lg">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          All opportunities
        </Link>
        <Typography color="primary">{fund?.name}</Typography>
      </Breadcrumbs>

      {step !== 2 ? (
        <Box display="flex" flexDirection="row" justifyContent="space-between" mb={3}>
          <Typography variant="h6">{fund?.name}</Typography>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={verticalNavigation}
                  onChange={() => setVerticalNavigation(!verticalNavigation)}
                  name="checkedA"
                />
              }
              label="Vertical navigation"
            />
          </FormGroup>
        </Box>
      ) : null}

      <Box display="flex" flexDirection={verticalNavigation ? "row" : "column"}>
        {step !== 2 ? (
          <Box mb={2} minWidth={250}>
            <Paper variant="outlined">
              <Stepper
                activeStep={step}
                orientation={verticalNavigation ? "vertical" : "horizontal"}
              >
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
            </Paper>
          </Box>
        ) : null}

        <Paper
          variant="outlined"
          style={{
            marginBottom: "20px",
            marginLeft: "20px",
            width: "100%",
            height: "100%",
          }}
        >
          <StepComponent fundId={fundId} next={next} exit={() => navigate("/")} />
        </Paper>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {step === 0 ? (
          <Button variant="contained" color="primary" onClick={next} id="next">
            Next
          </Button>
        ) : null}
      </Box>
    </Page>
  );
}
