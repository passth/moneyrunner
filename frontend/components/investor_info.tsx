import * as React from "react";
import { Typography, Box, List, ListItem, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { StatusIndicator } from "./status_indicator";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  listItem: {
    paddingLeft: 0,
  },
}));

interface InvestorInfoProps {
  subscription: {
    investor_name: string;
    status: string;
    answers: {
      "subscription/commitment": string;
      "investorID/legalName": string;
    };
    documents?: Array<{
      id?: string;
      name?: string;
      title?: string;
    }>;
  };
}

export function InvestorInfo({ subscription }: InvestorInfoProps) {
  const classes = useStyles();
  const commitment = subscription.answers["subscription/commitment"];

  return (
    <Paper variant="outlined" elevation={0} className={classes.root}>
      <Typography variant="h6" component="h6" gutterBottom className={classes.sectionTitle}>
        {subscription.answers["investorID/legalName"] || subscription.investor_name}
      </Typography>

      <Box mb={2}>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          <strong>Status</strong>
        </Typography>
        <StatusIndicator status={subscription.status} variant="body1" />
      </Box>

      {commitment ? (
        <Box mb={2}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            <strong>Commitment</strong>
          </Typography>
          <Typography variant="body1">{subscription.answers["subscription/commitment"]}</Typography>
        </Box>
      ) : null}

      {subscription.documents && subscription.documents.length > 0 ? (
        <Box mb={2}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            <strong>Documents</strong>
          </Typography>
          <List disablePadding>
            {subscription.documents.map((document) => (
              <ListItem key={document.id} className={classes.listItem}>
                <Typography variant="body1">• {document.name}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      ) : null}
    </Paper>
  );
}
