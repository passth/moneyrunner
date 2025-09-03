import * as React from "react";
import { Box, List, Paper } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  listItemContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    minHeight: 56,
  },
  skeletonListItem: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  titleSkeleton: {
    marginBottom: theme.spacing(3),
  },
  sectionTitle: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  statusIcon: {
    marginRight: theme.spacing(1),
  },
}));

type SkeletonVariant = "page_list" | "page";

interface LoadingSkeletonProps {
  variant: SkeletonVariant;
  delayMs?: number;
}

export function LoadingSkeleton({ variant, delayMs = 200 }: LoadingSkeletonProps) {
  const classes = useStyles();
  const [showSkeleton, setShowSkeleton] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(true);
    }, delayMs);

    return () => {
      clearTimeout(timer);
    };
  }, [delayMs]);

  const renderSkeletonContent = () => {
    switch (variant) {
      case "page_list":
        return (
          <>
            <Skeleton variant="text" height={48} width="60%" className={classes.titleSkeleton} />

            <Box mb={3} display="flex" justifyContent="flex-end">
              <Skeleton variant="rect" height={42} width={120} />
            </Box>

            <Skeleton variant="text" height={32} width="40%" className={classes.sectionTitle} />

            <List>
              {[1, 2, 3].map((item) => (
                <Paper
                  key={item}
                  variant="outlined"
                  elevation={0}
                  className={classes.skeletonListItem}
                >
                  <div className={classes.listItemContent}>
                    <Skeleton variant="text" width="30%" height={24} />
                    <Box display="flex" alignItems="center">
                      <Skeleton
                        variant="circle"
                        width={12}
                        height={12}
                        className={classes.statusIcon}
                      />
                      <Skeleton variant="text" width="80px" height={20} />
                    </Box>
                  </div>
                </Paper>
              ))}
            </List>

            <Skeleton variant="text" height={32} width="35%" className={classes.sectionTitle} />

            <List>
              {[1, 2].map((item) => (
                <Paper
                  key={item}
                  variant="outlined"
                  elevation={0}
                  className={classes.skeletonListItem}
                >
                  <div className={classes.listItemContent}>
                    <Skeleton variant="text" width="25%" height={24} />
                    <Box display="flex" alignItems="center">
                      <Skeleton
                        variant="circle"
                        width={12}
                        height={12}
                        className={classes.statusIcon}
                      />
                      <Skeleton variant="text" width="70px" height={20} />
                    </Box>
                  </div>
                </Paper>
              ))}
            </List>
          </>
        );

      case "page":
        return (
          <Skeleton variant="text" height={48} width="60%" className={classes.titleSkeleton} />
        );

      default:
        return <Skeleton variant="text" width="100%" height={40} />;
    }
  };

  if (!showSkeleton) {
    // Show nothing for the delay period to avoid blinking
    return null;
  }

  return renderSkeletonContent();
}
