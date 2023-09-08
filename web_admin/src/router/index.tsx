import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router-dom";
import AdminRoute from "@/pages/admin/admin.route";
import AuthRoute from "@/pages/auth/auth.route";

const router = createBrowserRouter([AdminRoute, AuthRoute]);

const RouterProvider = () => {
  return <ReactRouterProvider router={router} />;
};

export default RouterProvider;
