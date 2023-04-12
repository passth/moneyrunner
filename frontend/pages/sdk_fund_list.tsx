import * as React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import * as fundService from "services/funds";
import { Page } from "components/page";
import { FundList } from "components/fund_list";

const useStyles = makeStyles((theme) => ({
  allOpportunities: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
}));

export function SDKFundList() {
  const classes = useStyles();
  const [funds, setFunds] = React.useState([]);

  const openSubscriptionDocument = (fund) => {
    fundService
      .subscribe({ fundId: fund.id })
      .then(() => {
        window.location.href = `/subscribe/${fund.id}/`;
      })
      .catch((e) => {
        console.log({ resp: e });
      });
  };

  const fetchFunds = () => {
    fundService.getFunds().then((data: any) => {
      setFunds(data);
    });
  };

  React.useEffect(() => {
    fetchFunds();
  }, []);

  return (
    <Page>
      <Typography variant="h6" className={classes.allOpportunities}>
        All oportunities
      </Typography>
      <FundList
        funds={funds}
        onView={openSubscriptionDocument}
        onSubscribe={openSubscriptionDocument}
      />
    </Page>
  );
}
