import * as React from 'react';

declare global {
  interface Window {
    PassthroughSDK: any;
  }
}

const SubscriptionDocument = () => {
  const divRef = React.useRef();
  React.useEffect(() => {

    if (divRef?.current) {
      window.PassthroughSDK.init({
        elementId: "passthrough"
      })
    }

  }, [divRef]);
  return (
    <div>
      <div
        ref={divRef}
        id="passthrough"
      />
    </div>
  );
}

export default SubscriptionDocument;
