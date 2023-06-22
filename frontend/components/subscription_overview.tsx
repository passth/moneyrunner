import * as React from "react";
import { Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: "inherit",
  },
}));

export const SubscriptionOverview = () => {
  const classes = useStyles();
  return (
    <Paper variant="outlined" className={classes.root}>
      <Typography style={{ marginBottom: 20 }}>
        Moneyrunner.io is a demo application designed to showcase how other companies can seamlessly
        integrate with Passthrough for a nice investor onboarding experience.
      </Typography>

      <Typography style={{ marginBottom: 20 }}>
        All you have to do is click the "Next" button, and voila! The Passthrough UI is magically
        embedded into the website, highlighted by a red border that's impossible to miss.
      </Typography>

      <Typography style={{ marginBottom: 20 }}>
        Once the Passthrough workflow is complete, users will seamlessly transition to the next step
        outside of the Passthrough flow, all without having to leave the website.
      </Typography>
    </Paper>
  );
};
