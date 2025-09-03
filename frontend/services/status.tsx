import { makeStyles } from "@material-ui/core/styles";

export const useStatusStyles = makeStyles((theme) => ({
  statusContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: theme.spacing(1),
    width: 140, // Fixed width for consistent alignment
    flexShrink: 0, // Prevents shrinking
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
  },
  statusInProgress: {
    backgroundColor: "#4caf50", // green
  },
  statusAwaiting: {
    backgroundColor: "#ff9800", // yellow/orange
  },
  statusCompleted: {
    backgroundColor: "#2196f3", // blue
  },
}));

export const STATUS_CONFIG = {
  sent: {
    category: "needs_attention",
    dotClass: "statusInProgress",
    displayLabel: "In progress",
  },
  in_progress: {
    category: "needs_attention",
    dotClass: "statusInProgress",
    displayLabel: "In progress",
  },
  requested_changes: {
    category: "needs_attention",
    dotClass: "statusInProgress",
    displayLabel: "Changes requested",
  },
  signed: {
    category: "past",
    dotClass: "statusAwaiting",
    displayLabel: "Signed",
  },
  partially_signed: {
    category: "past",
    dotClass: "statusAwaiting",
    displayLabel: "Partially signed",
  },
  fully_executed: {
    category: "past",
    dotClass: "statusCompleted",
    displayLabel: "Completed",
  },
};

export const getStatusConfig = (status: string) => {
  const statusKey = status.toLowerCase();
  return (
    STATUS_CONFIG[statusKey] || {
      category: "past",
      dotClass: "statusAwaiting",
      displayLabel: status,
    }
  );
};

export const getStatusDotClass = (status: string, classes: any) => {
  const config = getStatusConfig(status);
  return classes[config.dotClass];
};

export const getDisplayLabel = (status: string) => {
  const config = getStatusConfig(status);
  return config.displayLabel;
};

export const isInProgress = (status: string) => {
  const config = getStatusConfig(status);
  return config.category === "needs_attention";
};
