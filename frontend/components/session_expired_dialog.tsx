import * as React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";

const messages = [
  // eslint-disable-next-line max-len
  "Your absence has not gone unnoticed. Do you wish to return to your work or disappear into the shadows?",
  // eslint-disable-next-line max-len
  "You've been gone for quite some time. Did you forget something, or are you trying to escape your fate?",
  "It seems you've taken an extended vacation. Are you ready to return to the real world?",
  "The world has been waiting for you. Are you ready to resume your mission?",
  "The silence is deafening. Are you still there? Do you want to continue?",
  "Your banishment will be swift and painless. Begone stale human.",
];

const getRandomMessage = () => messages[Math.floor(Math.random() * messages.length)];

export const SessionExpiredDialog = ({
  open,
  onClose,
  onContinue,
  onCancel,
  expirationTime = 15 * 60 * 1000, // 15 minutes
}) => {
  const [inactive, setInactive] = React.useState(false);

  const handleContinue = () => {
    setInactive(false);
    onContinue();
  };

  const handleCancel = () => {
    setInactive(false);
    onCancel();
  };

  React.useEffect(() => {
    let timeoutId: any;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        timeoutId = setTimeout(() => {
          setInactive(true);
        }, expirationTime);
      } else {
        clearTimeout(timeoutId);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Dialog open={inactive || open} onClose={onClose}>
      <DialogTitle>Your session expired</DialogTitle>
      <DialogContent>
        <DialogContentText>{getRandomMessage()}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Leave
        </Button>
        <Button onClick={handleContinue} color="primary" autoFocus>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};
