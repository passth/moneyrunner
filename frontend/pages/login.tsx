import * as React from "react";
import { Button, TextField, Box, Typography, Container } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

import { Logo } from "components/logo";

import { login } from "../services/auth";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  signButton: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  logo: {
    marginBottom: theme.spacing(3),
  },
}));

export const Login = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [error, setError] = React.useState(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login({
      email: String(data.get("email")),
      password: String(data.get("password")),
    })
      .then(() => {
        navigate("/");
      })
      .catch(({ data: d }) => {
        setError(d?.error || "An error occurred");
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Logo />
        {error && (
          <Typography color="error" style={{ marginTop: "10px" }}>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.signButton}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
