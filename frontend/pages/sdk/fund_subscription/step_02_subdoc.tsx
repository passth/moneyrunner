import * as React from 'react';
import fundService from '../../../services/funds';
declare global {
  interface Window {
    PassthroughSDK: any;
  }
}

const SubscriptionDocument = ({ fundId }) => {
  const divRef = React.useRef();
  const [token, setToken] = React.useState(null);

  React.useEffect(() => {
    fundService.getPassthroughSession({ fundId }).then((data: any) => {
      setToken(data.token);
    });
  }, []);

  React.useEffect(() => {
    if (divRef?.current && token) {
      window.PassthroughSDK.init({
        elementId: "passthrough",
        token,
      });
    }
  }, [divRef, token]);
  return (
    <div
      ref={divRef}
      id="passthrough"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

export default SubscriptionDocument;
