import * as React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from './pages/login2';
import ErrorPage from "./components/ErrorPage";

import { useExample } from './providers/example';

const App = () => {
  const { example } = useExample();
  const routes = [
    ...example.routes,
    {
      path: "/login",
      element: <Login />,
      errorElement: <ErrorPage />,
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default App;
