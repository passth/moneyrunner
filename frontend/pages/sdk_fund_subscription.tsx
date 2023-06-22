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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import * as fundService from "services/funds";
import { useScreenSize } from "services/utils";
import { Page } from "components/page";
import { DemoButton } from "components/demo_button";
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
  const [openExpiredDialog, setOpenExpiredDialog] = React.useState(false);
  const { isMobile } = useScreenSize();

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
  const inProgressStatuses = ["unsent", "sent", "in_progress", "requested_changes"];

  React.useEffect(() => {
    fundService.getFunds().then(({ data }: any) => {
      setFunds(
        data.filter((f) => f.subscriptionId && inProgressStatuses.includes(f.subscriptionStatus))
      );
    });

    fundService.getFund({ fundId }).then(({ data }: any) => {
      setFund(data);
      const isInProgress = inProgressStatuses.includes(data.subscriptionStatus);

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
        {isMobile ? null : <Typography color="primary">{fund?.name}</Typography>}
      </Breadcrumbs>

      {step !== 2 ? (
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          justifyContent="space-between"
          mb={3}
        >
          <Typography variant="h6">{fund?.name}</Typography>
          <Box display="flex" gridGap={10} mt={isMobile ? 2 : 0}>
            <Button onClick={() => fetchToken(fund.id)}>Refresh token</Button>
            <DemoButton />
          </Box>
        </Box>
      ) : null}

      <Box display="flex" flexDirection={isMobile ? "column" : "row"}>
        <div>
          {step !== 2 ? (
            <Box mb={2} mr={isMobile ? 0 : 2} minWidth={250}>
              <Paper variant="outlined">
                <Stepper
                  activeStep={step}
                  orientation={isMobile ? "horizontal" : "vertical"}
                  alternativeLabel={isMobile}
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

          {funds.length > 1 && step !== 2 ? (
            <Box mb={2} minWidth={250} mr={isMobile ? 0 : 2}>
              <Typography variant="subtitle2">Your active subscriptions</Typography>
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

        <StepComponent fundId={fund.id} next={next} token={token} />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {step === 0 ? (
          <Button variant="contained" color="primary" onClick={next} data-test="next">
            Next
          </Button>
        ) : null}
      </Box>
    </Page>
  );
}
