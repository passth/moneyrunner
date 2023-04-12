import * as React from "react";
import * as fundService from "services/funds";
import { useCustomTheme } from "services/providers/theme";
import { makeStyles } from "@material-ui/core/styles";
import { SessionExpiredDialog } from "./session_expired_dialog";

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

export const SubscriptionPassthrough = ({ fundId, next, exit }) => {
  const divRef = React.useRef(null);
  const classes = useStyles();
  const [token, setToken] = React.useState(null);
  const [openExpiredDialog, setOpenExpiredDialog] = React.useState(false);
  const { theme } = useCustomTheme();
  const fetchToken = () => {
    fundService.getPassthroughSession({ fundId }).then((data: any) => {
      setToken(data.token);
    });
  };

  React.useEffect(() => {
    fetchToken();
  }, []);

  React.useEffect(() => {
    if (divRef?.current && token) {
      window.PassthroughSDK.init({
        elementId: "passthrough",
        token,
        theme: {
          type: theme.theme.type,
          primaryColor: theme.theme.primaryColor,
          backgroundColor: theme.theme.backgroundColor,
        },
        onFinish: () => {
          fundService.completeSubscription({ fundId }).then(() => {
            next();
          });
        },
        onExpire: () => {
          setOpenExpiredDialog(true);
        },
      });
    }
  }, [divRef, token, theme.theme.type]);
  return (
    <>
      <SessionExpiredDialog
        open={openExpiredDialog}
        onClose={() => setOpenExpiredDialog(false)}
        onCancel={() => exit()}
        onContinue={() => {
          fetchToken();
          setOpenExpiredDialog(false);
        }}
      />
      <div ref={divRef} id="passthrough" className={classes.root} />
    </>
  );
};
