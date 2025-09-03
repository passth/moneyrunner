import * as React from "react";
import { Typography, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SubscriptionListItem } from "./subscription_list_item";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
  },
}));

interface SubscriptionSectionProps {
  title: string;
  subscriptions: Array<{
    id: string;
    investor_name: string;
    status: string;
  }>;
  dataTestId?: string;
  onSubscriptionClick: (subscriptionId: string) => void;
}

export function SubscriptionSection({
  title,
  subscriptions,
  onSubscriptionClick,
  dataTestId,
}: SubscriptionSectionProps) {
  const classes = useStyles();

  if (subscriptions.length === 0) {
    return null;
  }

  return (
    <>
      <Typography variant="h6" component="h6" gutterBottom className={classes.title}>
        {title}
      </Typography>
      <List>
        {subscriptions.map((subscription, idx) => (
          <SubscriptionListItem
            key={subscription.id}
            subscription={subscription}
            onClick={onSubscriptionClick}
            dataTestId={`${dataTestId}-${idx}`}
          />
        ))}
      </List>
    </>
  );
}
