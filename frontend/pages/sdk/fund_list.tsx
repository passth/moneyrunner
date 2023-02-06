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

  const subscribe = (fund) => {
    fundService.subscribe({ id: fund.id }).then(() => {
      location.href = `/subscribe/${fund.id}/`;
    });
  };

  return (
    <Page>
      <Typography variant="h6" className={classes.allOpportunities}>
        All oportunities
      </Typography>
      <FundList action={({ fund }) => (
        <>
          {fund.subscriptionId ? (
            <Button
              color="primary"
              variant="outlined"
              href={`/subscribe/${fund.id}/`}
            >
              View
            </Button>
          ) : (
            <Button
              color="primary"
              variant="outlined"
              onClick={() => subscribe(fund)}
            >
              Subscribe
            </Button>
          )}
        </>
      )} />
    </Page >
  );
}

export default SDKFundList;
