import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
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

function FundList({ onView, onSubscribe }) {
  const [funds, setFunds] = React.useState([]);
  const classes = useStyles();

  const fetchFunds = () => {
    fundService.getFunds().then((data: any) => {
      setFunds(data);
    });
  };

  const subscribe = (fund) => {
    fundService.subscribe({ id: fund.id }).then((data: any) => {
      fetchFunds();
      onSubscribe(data);
    }).catch((e) => {
      console.log({ resp: e });
    });
  };

  React.useEffect(() => {
    fetchFunds();
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
                <>
                  {row.subscriptionId ? (
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={() => onView(row)}
                    >
                      View
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={() => subscribe(row)}
                    >
                      Subscribe
                    </Button>
                  )}
                </>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FundList;
