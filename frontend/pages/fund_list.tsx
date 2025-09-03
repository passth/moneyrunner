import * as React from "react";

import * as api from "services/api";
import { Page } from "components/page";
import { FundList } from "components/fund_list";
import { useNavigate } from "react-router-dom";
import { Fund } from "services/api";

export function FundListPage() {
  const [funds, setFunds] = React.useState<Fund[]>([]);
  const navigate = useNavigate();

  const openFund = (fund: Fund) => {
    navigate(`/fund/${fund.id}/`);
  };

  const fetchFunds = async () => {
    const data = await api.getFunds();
    setFunds(data);
  };

  React.useEffect(() => {
    fetchFunds();
  }, []);

  return (
    <Page title="Funds">
      <FundList funds={funds} onClick={openFund} />
    </Page>
  );
}
