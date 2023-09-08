import ErrorPage from "@/components/error_page";
import { RouteObject } from "react-router-dom";
import HomePage from "./home.page";
const route: RouteObject = {
  path: "/",
  errorElement: <ErrorPage />,
  element: <HomePage />,
};
export default route;
