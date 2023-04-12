import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Error } from "components/error";
import { protectRoute } from "services/auth";
import { useExample } from "services/providers/example";

// Pages
import { APIFundList } from "./pages/api_fund_list";
import { SDKFundList } from "./pages/sdk_fund_list";
import { SDKFundSubscription } from "./pages/sdk_fund_subscription";
import { Login } from "./pages/login";

const apiRoutes = [
  {
    path: "/",
    element: <APIFundList />,
    errorElement: <Error />,
    loader: protectRoute,
  },
];

const sdkRoutes = [
  {
    path: "/",
    element: <SDKFundList />,
    errorElement: <Error />,
    loader: protectRoute,
  },
  {
    path: "/subscribe/:fundId",
    element: <SDKFundSubscription />,
    errorElement: <Error />,
    loader: protectRoute,
  },
];

export const App = () => {
  const { example } = useExample();
  const routes = [
    ...(example.name === "sdk" ? sdkRoutes : apiRoutes),
    {
      path: "/login",
      element: <Login />,
      errorElement: <Error />,
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};
