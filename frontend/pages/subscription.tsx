import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Page } from "components/page";
import { LoadingSkeleton } from "components/loading";
import * as api from "services/api";
import { PassthroughSDK } from "components/passthrough_sdk";
import { InvestorInfo } from "components/investor_info";
import { Fund, Subscription } from "services/api";

export function SubscriptionPage() {
  const { fundId, subscriptionId } = useParams();
  const [fund, setFund] = React.useState<Fund | null>(null);
  const [subscription, setSubscription] = React.useState<Subscription | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const isLoading = !fund || !subscription;

  const fetchSubscription = async () => {
    const data = await api.getSubscription({ subscriptionId });
    setSubscription(data.subscription);
    setToken(data.token);
  };

  const loadFund = async () => {
    const fundData = await api.getFund({ fundId });
    setFund(fundData);
  };

  React.useEffect(() => {
    loadFund();
    fetchSubscription();
  }, []);

  const handleBackClick = () => {
    navigate(`/fund/${fundId}`);
  };

  if (isLoading) {
    return (
      <Page size="md" onBack={handleBackClick}>
        <LoadingSkeleton variant="page" />
      </Page>
    );
  }

  return (
    <Page size="md" title={fund?.name} onBack={handleBackClick}>
      {token ? (
        <PassthroughSDK
          key={token}
          token={token}
          onExpire={fetchSubscription}
          onFinish={handleBackClick}
        />
      ) : (
        <InvestorInfo subscription={subscription} />
      )}
    </Page>
  );
}
