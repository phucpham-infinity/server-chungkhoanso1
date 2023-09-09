import AdminLayout from "./admin.layout";
import AuthenticationRouter from "@/components/authentication_router";
import { RouteObject } from "react-router-dom";
import Dashboard from "./dashboard";

const route: RouteObject = {
  path: "/admin",
  element: (
    <AuthenticationRouter>
      <AdminLayout />
    </AuthenticationRouter>
  ),
  children: [
    {
      path: "/admin/dashboard",
      element: <Dashboard />,
    },
  ],
};
export default route;
