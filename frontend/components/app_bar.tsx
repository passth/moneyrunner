import * as React from "react";
import { AppBar as MuiAppBar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TranslateIcon from "@material-ui/icons/Translate";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ViewCompactIcon from "@material-ui/icons/ViewCompact";

import { logout } from "services/auth";
import { useCustomTheme, THEMES } from "services/providers/theme";
import { useExample, EXAMPLES } from "services/providers/example";

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
}));

export const AppBar = () => {
  const classes = useStyles();
  const { theme, setTheme } = useCustomTheme();
  const { example, setExample } = useExample();

  return (
    <MuiAppBar position="absolute" color="default" elevation={0} className={classes.root}>
      <Logo small />
      <div>
        <Dropdown
          icon={<ViewCompactIcon />}
          options={EXAMPLES}
          selected={example}
          onSelect={(e) => setExample(e.name)}
        />
        <Dropdown
          icon={<TranslateIcon />}
          options={THEMES}
          selected={theme}
          onSelect={(t) => setTheme(t.name)}
        />
        <Button onClick={logout} startIcon={<ExitToAppIcon />}>
          Logout
        </Button>
      </div>
    </MuiAppBar>
  );
};
