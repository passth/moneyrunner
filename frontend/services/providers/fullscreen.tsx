import * as React from "react";

export const FullScreenContext = React.createContext(null);

export const FullScreenProvider = ({ children }) => {
  const [fullScreen, setFullScreen] = React.useState(false);
  const value = React.useMemo(() => ({ fullScreen, setFullScreen }), [fullScreen]);
  return <FullScreenContext.Provider value={value}>{children}</FullScreenContext.Provider>;
};

export const useFullScreen = () => React.useContext(FullScreenContext);
