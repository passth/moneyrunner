import * as React from "react";
import { Typography, Button, Box } from "@material-ui/core";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
  TimelineContent,
} from "@material-ui/lab";
import FlagIcon from "@material-ui/icons/Flag";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const getActionDescription = (action) => {
  switch (action) {
    case "SIGNED":
      return "You signed your subscription documents.";
    case "SUBMITTED":
      return "You completed your subscription documents.";
    case "REQUESTED_REVIEW":
      return "You requested a review.";
    case "SUBMITTED_FOR_NEXT_SIGNER":
      return "You completed and notified the authorized signer.";
    default:
      return "Completed";
  }
};

export const SubscriptionNextSteps = ({ data }) => (
  <Box width="100%" mt={4}>
    <div style={{ textAlign: "center" }}>
      <Typography variant="h5">All done!</Typography>
      <Typography noWrap={false}>
        You may close this window or go back to find more funds.
      </Typography>
      <Button variant="contained" href="/" color="primary" style={{ marginTop: 20 }}>
        See more funds
      </Button>
    </div>
    <div style={{ marginTop: 30 }}>
      <Timeline align="alternate">
        {data.action ? (
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary">
                <FlagIcon />
              </TimelineDot>
              <TimelineConnector style={{ height: 50 }} />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="h6" component="span">
                {getActionDescription(data.action)}
              </Typography>
              <Typography>Today</Typography>
            </TimelineContent>
          </TimelineItem>
        ) : null}
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot>
              <FlagIcon />
            </TimelineDot>
            <TimelineConnector style={{ height: 50 }} />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6" component="span">
              Fund reviews your subscription
            </Typography>
            <Typography>Typically takes between 2-4 business days</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot>
              <BorderColorIcon />
            </TimelineDot>
            <TimelineConnector style={{ height: 50 }} />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6" component="span">
              Fund signs your subscription
            </Typography>
            <Typography>Typically takes between 2-4 business days</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot>
              <CheckCircleIcon />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6" component="span">
              Receive your documents.
            </Typography>
            <Typography>Your subscription is now complete!</Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  </Box>
);
