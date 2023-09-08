import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router-dom";

import AdminRoute from "@/pages/admin/admin.route";
import AuthRoute from "@/pages/auth/auth.route";
import HomeRoute from "@/pages/home/home.route";

const router = createBrowserRouter([AdminRoute, AuthRoute, HomeRoute]);

const RouterProvider = () => {
  return <ReactRouterProvider router={router} />;
};

export default RouterProvider;
