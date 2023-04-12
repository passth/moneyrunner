import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Badge,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  allOpportunities: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
  table: {
    minWidth: 650,
  },
  row: {
    "&:last-child td, &:last-child th": { border: 0 },
  },
}));

export function FundList({ funds, onView, onSubscribe }) {
  const classes = useStyles();
  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Fund name</TableCell>
            <TableCell align="right">Fund size</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {funds.map((row, idx) => (
            <TableRow key={row.name} className={classes.row}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.size}</TableCell>
              <TableCell align="right">
                {row.subscriptionId ? (
                  <Badge
                    variant="dot"
                    color="error"
                    invisible={row.subscriptionStatus !== "requested_changes"}
                  >
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={() => onView(row)}
                      id={`view-${idx}`}
                    >
                      View
                    </Button>
                  </Badge>
                ) : (
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => onSubscribe(row)}
                    id={`subscribe-${idx}`}
                  >
                    Subscribe
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
