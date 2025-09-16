import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Error } from "components/error";
import { protectRoute } from "services/auth";

import { FundListPage } from "./pages/fund_list";
import { FundViewPage } from "./pages/fund_view";
import { SubscriptionPage } from "./pages/subscription";
import { Login } from "./pages/login";
import { SettingsPage } from "./pages/settings";

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <FundListPage />,
      errorElement: <Error />,
      loader: protectRoute,
    },
    {
      path: "/fund/:fundId",
      element: <FundViewPage />,
      errorElement: <Error />,
      loader: protectRoute,
    },
    {
      path: "/fund/:fundId/subscription/:subscriptionId",
      element: <SubscriptionPage />,
      errorElement: <Error />,
      loader: protectRoute,
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <Error />,
    },
    {
      path: "/settings",
      element: <SettingsPage />,
      errorElement: <Error />,
      loader: protectRoute,
    },
  ]);
  return <RouterProvider router={router} />;
};
