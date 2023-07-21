import * as React from "react";
import * as fundService from "services/funds";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: "100%",
    border: "1px solid red",
  },
}));

declare global {
  interface Window {
    PassthroughSDK: any;
  }
}

export const SubscriptionPassthrough = ({ fundId, next, onExpire, token }) => {
  const divRef = React.useRef(null);
  const classes = useStyles();
  const theme = useTheme();

  React.useEffect(() => {
    if (divRef?.current && token) {
      window.PassthroughSDK.init({
        elementId: "passthrough",
        token,
        theme: {
          type: theme.palette.type,
          primaryColor: theme.palette.primary,
          backgroundColor: theme.palette.background.default,
          fontFamily: theme.typography.fontFamily,
        },
        onFinish: () => {
          fundService.completeSubscription({ fundId }).then(() => {
            next();
          });
        },
        onExpire,
      });
    }
  }, [divRef, token, theme.palette.type]);

  return <div ref={divRef} id="passthrough" className={classes.root} />;
};
