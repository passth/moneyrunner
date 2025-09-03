import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

import { Page } from "components/page";
import * as api from "services/api";

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(3),
    paddingTop: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  buttonContainer: {
    display: "flex",
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

export const SettingsPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [settings, setSettings] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const [toastSeverity, setToastSeverity] = React.useState<"success" | "error">("success");

  const initSettings = async () => {
    try {
      const response = await api.getSettings();
      setSettings(response);
    } catch (err) {
      setToastMessage("Failed to load settings");
      setToastSeverity("error");
      setToastOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const updatedSettings = {
      baseUrl: settings?.baseUrl ? settings.baseUrl : undefined,
      apiKey: settings?.apiKey && settings.apiKey.trim() ? settings.apiKey : undefined,
    };

    try {
      await api.updateSettings(updatedSettings);
      setToastMessage("Settings saved successfully!");
      setToastSeverity("success");
      setToastOpen(true);
    } catch (err) {
      setToastMessage("Failed to save settings");
      setToastSeverity("error");
      setToastOpen(true);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    setSaving(true);
    try {
      await api.updateSettings({ baseUrl: "", apiKey: "" });
      setToastMessage("Settings reset to default successfully!");
      setToastSeverity("success");
      setToastOpen(true);
    } catch (err) {
      setToastMessage("Failed to reset settings");
      setToastSeverity("error");
      setToastOpen(true);
    } finally {
      initSettings();
      setSaving(false);
    }
  };

  const handleToastClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setToastOpen(false);
  };

  React.useEffect(() => {
    initSettings();
  }, []);

  if (loading) {
    return (
      <Page title="Settings" onBack={() => navigate("/")}>
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      </Page>
    );
  }

  return (
    <Page title="Settings" onBack={() => navigate("/")}>
      <Card className={classes.card} variant="outlined" elevation={0}>
        <CardContent>
          <Box className={classes.form}>
            <TextField
              label="Base URL"
              value={settings?.baseUrl}
              onChange={(e) => setSettings({ ...settings, baseUrl: e.target.value })}
              placeholder="https://api.passthrough.com"
              fullWidth
              variant="outlined"
              helperText="The base URL for the Passthrough API"
              disabled={saving}
            />

            <TextField
              label="API Key"
              value={settings?.apiKey}
              onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
              placeholder="Enter your API key"
              fullWidth
              variant="outlined"
              type="password"
              helperText="Your Passthrough API key"
              disabled={saving}
            />

            <Box className={classes.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                disabled={saving}
                disableElevation
              >
                {saving ? <CircularProgress size={20} /> : "Save Settings"}
              </Button>
              <Button variant="outlined" onClick={handleReset} disabled={saving} disableElevation>
                Reset to Default
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={toastOpen}
        autoHideDuration={4000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleToastClose} severity={toastSeverity} variant="filled">
          {toastMessage}
        </Alert>
      </Snackbar>
    </Page>
  );
};
