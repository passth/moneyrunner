import * as React from "react";
import { Paper, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    minHeight: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(4),
    textAlign: "center",
  },
  subtitle: {
    marginBottom: theme.spacing(3),
  },
  title: {
    fontWeight: "bold",
  },
}));

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, subtitle, action }: EmptyStateProps) {
  const classes = useStyles();

  return (
    <Paper variant="outlined" elevation={0} className={classes.root}>
      <Typography variant="h6" component="h6" gutterBottom className={classes.title}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" color="textSecondary" className={classes.subtitle}>
          {subtitle}
        </Typography>
      )}
      {action && <Box>{action}</Box>}
    </Paper>
  );
}
