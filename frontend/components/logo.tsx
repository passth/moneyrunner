import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: any): any => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "column",
  },
  smallLogo: {
    fontWeight: "300",
    fontSize: theme.typography.pxToRem(20),
  },
  smallIo: {
    fontSize: theme.typography.pxToRem(13),
  },
  bigIo: {
    fontSize: theme.typography.pxToRem(20),
  },
  bigLogo: {
    fontWeight: "300",
    fontSize: theme.typography.pxToRem(50),
  },
  slogan: {
    fontSize: theme.typography.pxToRem(12),
  },
}));

export const Logo = ({ small = false }: { small?: boolean }) => {
  const classes: any = useStyles();
  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h3"
        className={small ? classes.smallLogo : classes.bigLogo}
      >
        moneyrunner
        <Typography
          component="span"
          variant="h5"
          color="primary"
          className={small ? classes.smallIo : classes.bigIo}
        >
          .io
        </Typography>
      </Typography>
      {!small ? (
        <Typography variant="subtitle2" color="textSecondary" className={classes.slogan}>
          A demo application to showcase Passthrough's API integration
        </Typography>
      ) : null}
    </div>
  );
};
