import * as React from 'react';
import { AppBar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TranslateIcon from '@material-ui/icons/Translate';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ViewCompactIcon from '@material-ui/icons/ViewCompact';

import { logout } from '../services/auth';
import { useCustomTheme, THEMES } from '../providers/theme';
import { useExample, EXAMPLES } from '../providers/example';
import Dropdown from './Dropdown';

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
  },
}));

const CustomAppBar = () => {
  const classes = useStyles()
  const { theme, setTheme } = useCustomTheme();
  const { example, setExample } = useExample();

  return (
    <AppBar
      position="absolute"
      color="default"
      elevation={0}
      className={classes.root}
    >
      <div>
        <Typography variant="h6" color="inherit" noWrap>
          MarketDemo
        </Typography>
      </div>
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
    </AppBar>
  );
};

export default CustomAppBar;
