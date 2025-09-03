import * as React from "react";
import { Typography, ListItem, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  listItemContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    minHeight: 56,
  },
  paper: {
    marginBottom: theme.spacing(1),
  },
  fundName: {
    fontWeight: "bold",
  },
}));

export function FundList({ funds, onClick }) {
  const classes = useStyles();
  return (
    <div>
      {funds.map((fund, idx) => (
        <Paper key={fund.name} variant="outlined" elevation={0} className={classes.paper}>
          <ListItem button onClick={() => onClick(fund)} data-test={`view-${idx}`}>
            <div className={classes.listItemContent}>
              <Typography variant="body1">{fund.name}</Typography>
            </div>
          </ListItem>
        </Paper>
      ))}
    </div>
  );
}
