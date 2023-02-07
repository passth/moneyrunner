import * as React from 'react';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import fundService from '../../services/funds';

import Page from '../../components/Page';
import FundList from '../../components/FundList';

const useStyles = makeStyles((theme) => ({
  allOpportunities: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
}));

function SDKFundList() {
  const classes = useStyles();

  const openSubscriptionDocument = (fund) => {
    location.href = `/subscribe/${fund.id}/`;
  };

  return (
    <Page>
      <Typography variant="h6" className={classes.allOpportunities}>
        All oportunities
      </Typography>
      <FundList
        onView={openSubscriptionDocument}
        onSubscribe={openSubscriptionDocument}
      />
    </Page>
  );
}

export default SDKFundList;
