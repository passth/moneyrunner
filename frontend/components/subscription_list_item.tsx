import * as React from "react";
import { Typography, ListItem, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { StatusIndicator } from "./status_indicator";

const useStyles = makeStyles((theme) => ({
  listItemContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    minHeight: 56,
  },
  statusContainer: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
  },
  paper: {
    marginBottom: theme.spacing(1),
  },
}));

interface SubscriptionListItemProps {
  subscription: {
    id: string;
    investor_name: string;
    status: string;
  };
  onClick: (subscriptionId: string) => void;
  dataTestId?: string;
}

export function SubscriptionListItem({
  subscription,
  onClick,
  dataTestId,
}: SubscriptionListItemProps) {
  const classes = useStyles();

  return (
    <Paper variant="outlined" elevation={0} className={classes.paper}>
      <ListItem button onClick={() => onClick(subscription.id)} data-test={dataTestId}>
        <div className={classes.listItemContent}>
          <Typography variant="body1">{subscription.investor_name}</Typography>
          <StatusIndicator status={subscription.status} />
        </div>
      </ListItem>
    </Paper>
  );
}
