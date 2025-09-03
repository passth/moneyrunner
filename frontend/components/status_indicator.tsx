import * as React from "react";
import { Typography } from "@material-ui/core";
import { useStatusStyles, getStatusDotClass, getDisplayLabel } from "services/status";

interface StatusIndicatorProps {
  status: string;
  variant?: "body1" | "body2";
}

export function StatusIndicator({ status, variant = "body2" }: StatusIndicatorProps) {
  const statusClasses = useStatusStyles();

  return (
    <div className={statusClasses.statusContainer}>
      <div className={`${statusClasses.statusDot} ${getStatusDotClass(status, statusClasses)}`} />
      <Typography variant={variant} color="textSecondary">
        {getDisplayLabel(status)}
      </Typography>
    </div>
  );
}
