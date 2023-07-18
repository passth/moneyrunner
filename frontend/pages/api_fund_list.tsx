import * as React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Page } from "components/page";
import { FundList } from "components/fund_list";
import * as fundService from "services/funds";

const useStyles = makeStyles((theme) => ({
  allOpportunities: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
}));

export function APIFundList() {
  const classes = useStyles();
  const [funds, setFunds] = React.useState([]);

  const openSubscriptionDocument = (fund) => {
    window.open(fund.subscriptionPassthroughInvitationUrl, "_blank", "noopener,noreferrer");
  };

  const onSubscribe = (fund) => {
    fundService
      .subscribe({ fundId: fund.id })
      .then(({ data }) => {
        openSubscriptionDocument(data);
        fetchFunds();
      })
      .catch((e) => {
        console.log({ resp: e });
      });
  };

  const fetchFunds = () => {
    fundService.getFunds().then(({ data }: any) => {
      setFunds(data);
    });
  };

  React.useEffect(() => {
    fetchFunds();
  }, []);

  return (
    <Page>
      <Typography variant="h6" className={classes.allOpportunities}>
        All opportunities
      </Typography>
      <FundList funds={funds} onView={openSubscriptionDocument} onSubscribe={onSubscribe} />
    </Page>
  );
}
