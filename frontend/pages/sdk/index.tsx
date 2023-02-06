import * as React from 'react';
import ErrorPage from '../../components/ErrorPage';
import { protectRoute } from '../../services/auth';

import FundListPage from './fund_list';
import SubscriptionPage from './fund_subscription';

export default [
  {
    path: "/",
    element: <FundListPage />,
    errorElement: <ErrorPage />,
    loader: protectRoute,
  },
  {
    path: "/subscribe/:fundId",
    element: <SubscriptionPage />,
    errorElement: <ErrorPage />,
    loader: protectRoute,
  },
];
