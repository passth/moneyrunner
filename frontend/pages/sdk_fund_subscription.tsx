import * as React from "react";
import {
  Typography,
  Link,
  Breadcrumbs,
  Stepper,
  Step,
  StepLabel,
  StepButton,
  Box,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
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
import { SessionExpiredDialog } from "components/session_expired_dialog";

const STEPS = {
  0: SubscriptionOverview,
  1: SubscriptionPassthrough,
  2: SubscriptionNextSteps,
};

export function SDKFundSubscription() {
  const { fundId } = useParams();
  const [step, setStep] = React.useState(0);
  const [fund, setFund] = React.useState(null);
  const [funds, setFunds] = React.useState([]);
  const [token, setToken] = React.useState(null);
  const [verticalNavigation, setVerticalNavigation] = React.useState(true);
  const [openExpiredDialog, setOpenExpiredDialog] = React.useState(false);

  const fetchToken = (id) => {
    fundService.getPassthroughSession({ fundId: id }).then(({ data }: any) => {
      setToken(data.token);
    });
  };

  const updateFund = (f) => {
    setFund(f);
    fetchToken(f.id);
  };

  const navigate = useNavigate();
  const StepComponent = STEPS[step];

  React.useEffect(() => {
    fundService.getFunds().then(({ data }: any) => {
      setFunds(data.filter((f) => f.subscriptionId));
    });

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
    const newStep = step + 1;

    if (newStep === 1) {
      fetchToken(fund.id);
    }

    if (STEPS[newStep]) {
      setStep(newStep);
    }
  };

  return (
    <Page size="lg">
      <SessionExpiredDialog
        open={openExpiredDialog}
        onClose={() => setOpenExpiredDialog(false)}
        onCancel={() => navigate("/")}
        onContinue={() => {
          fetchToken(fund.id);
          setOpenExpiredDialog(false);
        }}
      />

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
            <Button onClick={() => fetchToken(fund.id)}>Refresh token</Button>
          </FormGroup>
        </Box>
      ) : null}

      <Box display="flex" flexDirection={verticalNavigation ? "row" : "column"}>
        <div>
          {step !== 2 ? (
            <Box mb={2} minWidth={250}>
              <Paper variant="outlined">
                <Stepper
                  activeStep={step}
                  orientation={verticalNavigation ? "vertical" : "horizontal"}
                >
                  <Step>
                    {step !== 0 ? (
                      <StepButton onClick={() => setStep(0)} completed>
                        Overview
                      </StepButton>
                    ) : (
                      <StepLabel>Overview</StepLabel>
                    )}
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

          {funds.length > 1 ? (
            <Box mb={2} minWidth={250}>
              <Typography variant="subtitle2">Your subscriptions</Typography>
              <Paper variant="outlined">
                <List component="nav" aria-label="secondary mailbox folders">
                  {funds.map((f) => (
                    <ListItem
                      button
                      onClick={() => updateFund(f)}
                      selected={f.id === fund.id}
                      disabled={f.id === fund.id}
                    >
                      <ListItemText primary={f.name} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Box>
          ) : null}
        </div>

        <Paper
          variant="outlined"
          style={{
            marginLeft: verticalNavigation ? "20px" : null,
            marginBottom: "20px",
            width: "100%",
            height: "100%",
            minHeight: "450px",
          }}
        >
          <StepComponent fundId={fund.id} next={next} token={token} />
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
