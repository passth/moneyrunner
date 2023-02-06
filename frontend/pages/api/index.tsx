import * as React from 'react';
import ErrorPage from '../../components/ErrorPage';
import { protectRoute } from '../../services/auth';

import FundListPage from './fund_list';

export default [
  {
    path: "/",
    element: <FundListPage />,
    errorElement: <ErrorPage />,
    loader: protectRoute,
  },
];
