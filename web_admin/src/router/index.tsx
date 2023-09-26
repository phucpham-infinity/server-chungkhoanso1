import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router-dom";

import AdminRoute from "@/pages/admin/admin.route";
import AuthRoute from "@/pages/auth/auth.route";
import HomeRoute from "@/pages/home/home.route";

import StatisticRoute from "@/pages/home/statistic/statistic.route";
import UtilitiesRoute from "@/pages/home/utilities/utilities.route";

const router = createBrowserRouter([
  AdminRoute,
  AuthRoute,
  HomeRoute,
  StatisticRoute,
  UtilitiesRoute,
]);

const RouterProvider = () => {
  return <ReactRouterProvider router={router} />;
};

export default RouterProvider;
