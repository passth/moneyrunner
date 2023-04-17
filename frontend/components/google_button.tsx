import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { GoogleIcon } from "./google_icon";

const useStyles = makeStyles((theme) => ({
  icon: {
    width: "15px",
    marginRight: theme.spacing(1),
  },
}));

export const GoogleButton = ({ onClick, disabled }) => {
  const classes = useStyles();
  return (
    <Button
      variant="outlined"
      color="default"
      onClick={onClick}
      disabled={disabled}
      startIcon={<GoogleIcon className={classes.icon} />}
    >
      Login with Google
    </Button>
  );
};
