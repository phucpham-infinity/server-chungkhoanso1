import LoginPage from "./login";
import ErrorPage from "@/components/error_page";
import { RouteObject } from "react-router-dom";
import AuthLayout from "./auth.layout";

const route: RouteObject = {
  path: "/auth",
  errorElement: <ErrorPage />,
  element: <AuthLayout />,
  children: [
    {
      path: "/auth/login",
      element: <LoginPage />,
    },
  ],
};
export default route;
