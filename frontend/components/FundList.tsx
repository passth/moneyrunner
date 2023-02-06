import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import fundService from '../services/funds';

const useStyles = makeStyles((theme) => ({
  allOpportunities: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
  table: {
    minWidth: 650,
  },
  row: {
    '&:last-child td, &:last-child th': { border: 0 }
  },
}));

function FundList({ action: Action }) {
  const [funds, setFunds] = React.useState([]);
  const classes = useStyles();

  React.useEffect(() => {
    fundService.getFunds().then((data: any) => {
      setFunds(data);
    });
  }, []);

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Fund name</TableCell>
            <TableCell align="right">Fund size</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {funds.map((row) => (
            <TableRow
              key={row.name}
              className={classes.row}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.size}</TableCell>
              <TableCell align="right">
                <Action fund={row} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FundList;
