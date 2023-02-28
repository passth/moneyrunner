import * as React from "react";
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from "./AppBar";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(4),
  },
}));

const Page = ({ children, size = "md" }: { children: any; size?: "md" | "lg" }) => {
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

export default Page;
