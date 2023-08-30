import * as React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { AppBar } from "./app_bar";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(4),
  },
}));

export const Page = ({ children, size = "md" }: { children: any; size?: "md" | "lg" | null }) => {
  const classes = useStyles();
  return (
    <>
      <AppBar />
      <Container component="main" maxWidth={size} className={classes.container}>
        {children}
      </Container>
    </>
  );
};
