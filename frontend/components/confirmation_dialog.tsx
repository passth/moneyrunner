import * as React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core";

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  dataTestId?: string;
}

export function ConfirmationDialog({
  open,
  title,
  disabled,
  confirmLabel = "Continue",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  children,
  dataTestId,
}: ConfirmationDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          {cancelLabel}
        </Button>
        <Button
          onClick={onConfirm}
          color="primary"
          variant="contained"
          disableElevation
          disabled={disabled}
          data-test={dataTestId}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
