import * as React from "react";
import { useRouteError } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    textAlign: "center",
  },
}));

export const Error = () => {
  const classes = useStyles();
  const error = useRouteError() as { statusText?: string; message?: string } | null;
  console.error(error);

  return (
    <div id="error-page" className={classes.root}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message}</i>
      </p>
    </div>
  );
};
