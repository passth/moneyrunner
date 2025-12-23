import * as React from "react";
import { Button, Box, CircularProgress, TextField, DialogContentText } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { Page } from "components/page";
import { LoadingSkeleton } from "components/loading";
import { EmptyState } from "components/empty_state";
import { SubscriptionSection } from "components/subscription_section";
import { ConfirmationDialog } from "components/confirmation_dialog";
import * as api from "services/api";
import * as auth from "services/auth";
import { isInProgress } from "services/status";
import { Fund, Subscription } from "services/api";

const inProgress = (sub: Subscription) => isInProgress(sub.status);

export function FundViewPage() {
  const { fundId } = useParams();
  const [fund, setFund] = React.useState<Fund | null>(null);
  const [subscriptions, setSubscriptions] = React.useState<Subscription[] | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);
  const [isSubscribing, setIsSubscribing] = React.useState(false);
  const [legalName, setLegalName] = React.useState("");
  const navigate = useNavigate();

  const isLoading = !fund || !subscriptions;
  const needsAttentionSubscriptions = subscriptions?.filter(inProgress) || [];
  const pastSubscriptions = subscriptions?.filter((sub) => !inProgress(sub)) || [];

  React.useEffect(() => {
    const loadData = async () => {
      const fundData = await api.getFund({ fundId });
      setFund(fundData);
      const subscriptionsData = await api.getSubscriptions({ fundId });
      setSubscriptions(subscriptionsData);
    };
    loadData();
  }, []);

  const handleCreateSubscription = () => {
    const user = auth.getUser();
    setLegalName(user?.name || "");
    setConfirmDialogOpen(true);
  };

  const handleConfirmSubscription = async () => {
    setConfirmDialogOpen(false);
    setIsSubscribing(true);
    try {
      const data = await api.subscribe({ fundId, legalName });
      navigate(`/fund/${fundId}/subscription/${data.id}/`);
    } catch {
      setIsSubscribing(false);
    }
  };

  const handleCancelSubscription = () => {
    setConfirmDialogOpen(false);
  };

  const handleSubscriptionClick = (subscriptionId: string) => {
    navigate(`/fund/${fundId}/subscription/${subscriptionId}/`);
  };

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <Page size="md" title={!isLoading ? fund.name : undefined} onBack={handleBackClick}>
      {isLoading ? (
        <LoadingSkeleton variant="page_list" />
      ) : (
        <>
          {subscriptions && subscriptions.length > 0 && (
            <Box mb={3} display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateSubscription}
                disableElevation
                size="large"
                disabled={isSubscribing}
                data-test="subscribe-btn"
                startIcon={
                  isSubscribing ? <CircularProgress size={16} color="inherit" /> : undefined
                }
              >
                Subscribe
              </Button>
            </Box>
          )}

          <SubscriptionSection
            title="Needs your attention"
            subscriptions={needsAttentionSubscriptions}
            onSubscriptionClick={handleSubscriptionClick}
            dataTestId="needs-attention"
          />

          <SubscriptionSection
            title="Subscriptions"
            subscriptions={pastSubscriptions}
            onSubscriptionClick={handleSubscriptionClick}
            dataTestId="past-subscriptions"
          />

          {subscriptions && subscriptions.length === 0 && (
            <EmptyState
              title="No subscriptions"
              subtitle="You have not subscribed to this fund, click below to create a subscription"
              action={
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreateSubscription}
                  disableElevation
                  size="large"
                  disabled={isSubscribing}
                  data-test="subscribe-btn"
                  startIcon={
                    isSubscribing ? <CircularProgress size={16} color="inherit" /> : undefined
                  }
                >
                  Subscribe
                </Button>
              }
            />
          )}
        </>
      )}

      <ConfirmationDialog
        open={confirmDialogOpen}
        title="New subscription"
        onConfirm={handleConfirmSubscription}
        onCancel={handleCancelSubscription}
        disabled={!legalName}
        dataTestId="confirm-btn"
      >
        <DialogContentText>
          You are about to start a new subscription process for {fund?.name}.
        </DialogContentText>
        <DialogContentText>
          Provide below the full legal name of the investment vehicle (e.g. LLC, Trust) or
          individual investor who is subscribing to the fund.
        </DialogContentText>
        <Box mt={4} mb={4}>
          <TextField
            fullWidth
            label="Full legal name"
            value={legalName}
            onChange={(e) => setLegalName(e.target.value)}
            variant="outlined"
            required
            data-test="prefill-legal-name"
          />
        </Box>
      </ConfirmationDialog>
    </Page>
  );
}
