import * as React from "react";
import { Container, Button, Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ArrowBack } from "@mui/icons-material";

import { AppBar } from "./app_bar";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(4),
  },
  title: {
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
  },
  backButton: {
    marginBottom: theme.spacing(2),
  },
}));

interface PageProps {
  children: React.ReactNode;
  size?: "md" | "lg" | null;
  title?: string;
  onBack?: () => void;
}

export const Page = ({ children, size = "md", title, onBack }: PageProps) => {
  const classes = useStyles();
  return (
    <>
      <AppBar />
      <Container component="main" maxWidth={size} className={classes.container}>
        <Box mt={4}>
          {onBack && (
            <Button
              color="inherit"
              onClick={onBack}
              startIcon={<ArrowBack />}
              className={classes.backButton}
            >
              Back
            </Button>
          )}

          {title && (
            <Typography variant="h4" component="h4" gutterBottom className={classes.title}>
              {title}
            </Typography>
          )}

          {children}
        </Box>
      </Container>
    </>
  );
};
