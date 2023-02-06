import * as React from 'react';
import apiRoutes from '../pages/api';
import sdkRoutes from '../pages/sdk';

export const ExampleContext = React.createContext(null);

type Example = {
  name: 'api' | 'sdk';
  display: string;
  routes: any,
};

export const EXAMPLES: Example[] = [
  {
    name: 'api',
    display: 'API example',
    routes: apiRoutes,
  },
  {
    name: 'sdk',
    display: 'SDK example',
    routes: sdkRoutes,
  },
];

export const getStoredExample = () => window.localStorage.getItem('exampleName');

export const setStoredExample = (exampleName: 'api' | 'sdk') => window.localStorage.setItem('exampleName', exampleName);

export const ExampleProvider = ({ children }) => {
  const [exampleName, setExampleName] = React.useState(getStoredExample() || EXAMPLES[0].name);
  const example = EXAMPLES.find((t) => t.name === exampleName);

  const updateExample = (name: 'api' | 'sdk') => {
    setStoredExample(name);
    setExampleName(name);
    window.location.href = '/';
  };

  return (
    <ExampleContext.Provider value={{
      example,
      setExample: updateExample,
    }}>
      {children}
    </ExampleContext.Provider>
  );
};

export const useExample = () => React.useContext(ExampleContext);
