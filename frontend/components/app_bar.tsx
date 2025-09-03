import * as React from "react";
import { AppBar as MuiAppBar, Button, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TranslateIcon from "@material-ui/icons/Translate";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";

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
            <Button onClick={() => navigate("/settings")} startIcon={<SettingsIcon />}>
              Settings
            </Button>
            <Button onClick={logout} startIcon={<ExitToAppIcon />}>
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
        <Button onClick={() => navigate("/settings")} startIcon={<SettingsIcon />}>
          Settings
        </Button>
        <Button onClick={logout} startIcon={<ExitToAppIcon />}>
          Logout
        </Button>
      </div>
    </MuiAppBar>
  );
};
