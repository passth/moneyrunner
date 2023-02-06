import * as React from 'react';
import { Typography } from '@material-ui/core';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineDot, TimelineContent } from '@material-ui/lab';
import FlagIcon from '@material-ui/icons/Flag';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const NextSteps = () => (
  <div>
    <div style={{ textAlign: 'center' }}>
      <Typography variant="h5">All done!</Typography>
      <Typography>Our marketplace will work closely with the fund to finish your subscription in a timely manner. You may close this window or go back to find more funds.</Typography>
    </div>
    <Timeline>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary">
            <FlagIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="h6" component="span">
            You signed your subscription
          </Typography>
          <Typography>
            Today
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>
            <FlagIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="h6" component="span">
            Fund reviews your subscription
          </Typography>
          <Typography>
            Typically takes between 2-4 business days
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>
            <BorderColorIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="h6" component="span">
            Fund signs your subscription
          </Typography>
          <Typography>
            Typically takes between 2-4 business days
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>
            <CheckCircleIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="h6" component="span">
            Receive your documents.
          </Typography>
          <Typography>
            Your subscription is now complete!
          </Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  </div>
);

export default NextSteps;
