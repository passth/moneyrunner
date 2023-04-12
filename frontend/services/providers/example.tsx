import * as React from "react";

export const ExampleContext = React.createContext(null);

type Example = {
  name: "api" | "sdk";
  display: string;
};

export const EXAMPLES: Example[] = [
  {
    name: "sdk",
    display: "SDK example",
  },
  {
    name: "api",
    display: "API example",
  },
];

const EXAMPLES_MAP = EXAMPLES.reduce((acc, example) => ({ ...acc, [example.name]: example }), {});

export const getStoredExample = () => window.localStorage.getItem("exampleName");

export const setStoredExample = (exampleName: "api" | "sdk") =>
  window.localStorage.setItem("exampleName", exampleName);

export const ExampleProvider = ({ children }) => {
  const [exampleName, setExampleName] = React.useState(getStoredExample() || EXAMPLES[0].name);
  const example = EXAMPLES_MAP[exampleName];

  const setExample = (name: "api" | "sdk") => {
    setStoredExample(name);
    setExampleName(name);
    window.location.href = "/";
  };

  const value = React.useMemo(() => ({ example, setExample }), [example, setExample]);
  return <ExampleContext.Provider value={value}>{children}</ExampleContext.Provider>;
};

export const useExample = () => React.useContext(ExampleContext);
