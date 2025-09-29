import * as React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { Computer, Description, Fullscreen, Group } from "@material-ui/icons";
import { DemoButton } from "components/demo_button";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    border: "1px solid red",
  },
  normal: {
    width: "100%",
    height: "100%",
    border: "1px solid red",
    margin: "0 auto",
  },
  fullscreen: {
    width: "100vw",
    height: "100%",
    border: "1px solid red",
    position: "relative",
    left: "50%",
    right: "50%",
    marginLeft: "-50vw",
    marginRight: "-50vw",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

declare global {
  interface Window {
    PassthroughSDK: {
      init: (config: {
        elementId: string;
        token: string;
        theme: object;
        features: object;
        onFinish: () => void;
        onExpire: () => void;
        onError: () => void;
      }) => void;
    };
  }
}

export const PassthroughSDK = ({ onExpire, onFinish, token }) => {
  const divRef = React.useRef(null);
  const classes = useStyles();
  const theme = useTheme();
  const [size, setSize] = React.useState("normal");
  const [features, setFeatures] = React.useState(["collaborators", "lpProMode"]);
  const handleFeatures = (event: React.MouseEvent<HTMLElement>, newFeatures: string[]) => {
    setFeatures(newFeatures);
  };

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
        features: {
          collaborators: features.includes("collaborators"),
          lpProMode: features.includes("lpProMode"),
        },
        onFinish,
        onExpire: () => onExpire(),
        onError: () => {
          // eslint-disable-next-line no-alert
          window.alert("Contacted support");
        },
      });
    }
  }, [divRef, token, theme.palette.type, features]);

  const handleSizeChange = (event, newSize) => {
    if (newSize !== null) {
      setSize(newSize);
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "fullscreen":
        return classes.fullscreen;
      default:
        return classes.normal;
    }
  };

  return (
    <div>
      <div className={classes.toolbar}>
        <ToggleButtonGroup
          value={features}
          size="small"
          onChange={handleFeatures}
          aria-label="features"
        >
          <ToggleButton value="collaborators" aria-label="collaborators">
            <Group />
          </ToggleButton>
          <ToggleButton value="lpProMode" aria-label="lpProMode">
            <Description />
          </ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          value={size}
          exclusive
          size="small"
          onChange={handleSizeChange}
          aria-label="size selection"
        >
          <ToggleButton value="normal" aria-label="normal size">
            <Computer />
          </ToggleButton>
          <ToggleButton value="fullscreen" aria-label="fullscreen size">
            <Fullscreen />
          </ToggleButton>
        </ToggleButtonGroup>
        <DemoButton />
      </div>
      <div ref={divRef} id="passthrough" className={getSizeClass()} />
    </div>
  );
};
