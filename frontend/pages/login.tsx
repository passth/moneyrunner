import * as React from "react";
import { Paper, Box, Typography, Container } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

import { Logo } from "components/logo";
import { GoogleButton } from "../components/google_button";

import { login } from "../services/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  signButton: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  logo: {
    marginBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: "center",
  },
  errorText: {
    marginTop: theme.spacing(1),
  },
}));

export const Login = () => {
  const classes = useStyles();
  const [loading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login()
      .then((response: { data: { authUri: string } }) => {
        window.location.href = response.data.authUri;
      })
      .catch((e) => {
        setError(e?.response?.error || "An error occurred");
      });
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box className={classes.root}>
        <Paper variant="outlined" className={classes.paper}>
          <div className={classes.logo}>
            <Logo />
          </div>
          {error && (
            <Typography color="error" className={classes.errorText}>
              {error}
            </Typography>
          )}
          <Typography paragraph>Sign in with your Google account to continue.</Typography>
          <GoogleButton onClick={handleSubmit} disabled={loading} />
        </Paper>
      </Box>
    </Container>
  );
};
