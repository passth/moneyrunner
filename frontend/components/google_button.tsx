import * as React from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { GoogleIcon } from "./google_icon";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
  },
}));

export const GoogleButton = ({ onClick, disabled }) => {
  const classes = useStyles();
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      disabled={disabled}
      startIcon={<GoogleIcon className={classes.icon} />}
      data-test="google-button"
    >
      Login with Google
    </Button>
  );
};
