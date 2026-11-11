import * as React from "react";
import { AppBar as MuiAppBar, Button, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TranslateIcon from "@mui/icons-material/Translate";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";

import { logout } from "services/auth";
import { useScreenSize } from "services/utils";
import { useCustomTheme, THEMES } from "services/providers/theme";
import { useNavigate } from "react-router-dom";

import { Logo } from "./logo";
import { Dropdown } from "./dropdown";

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: theme.spacing(2),
  },
  mobileRoot: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: theme.spacing(2),
  },
  mobileMenu: {
    display: "flex",
    gap: theme.spacing(2),
  },
  toolbar: {
    display: "flex",
    gap: theme.spacing(2),
  },
}));

export const AppBar = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { theme, setTheme } = useCustomTheme();
  const { isMobile } = useScreenSize();
  const navigate = useNavigate();

  if (isMobile) {
    return (
      <MuiAppBar position="absolute" color="default" elevation={0} className={classes.mobileRoot}>
        <div className={classes.mobileMenu}>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            <MenuIcon />
          </IconButton>
          <Logo small />
        </div>
        {open && (
          <div>
            <Dropdown
              icon={<TranslateIcon />}
              options={THEMES}
              selected={theme}
              onSelect={(t) => setTheme(t.name)}
            />
            <Button
              color="inherit"
              onClick={() => navigate("/settings")}
              startIcon={<SettingsIcon />}
            >
              Settings
            </Button>
            <Button color="inherit" onClick={logout} startIcon={<ExitToAppIcon />}>
              Logout
            </Button>
          </div>
        )}
      </MuiAppBar>
    );
  }

  return (
    <MuiAppBar position="absolute" color="default" elevation={0} className={classes.root}>
      <Logo small />
      <div className={classes.toolbar}>
        <Dropdown
          testId="theme"
          icon={<TranslateIcon />}
          options={THEMES}
          selected={theme}
          onSelect={(t) => setTheme(t.name)}
        />
        <Button color="inherit" onClick={() => navigate("/settings")} startIcon={<SettingsIcon />}>
          Settings
        </Button>
        <Button color="inherit" onClick={logout} startIcon={<ExitToAppIcon />}>
          Logout
        </Button>
      </div>
    </MuiAppBar>
  );
};
