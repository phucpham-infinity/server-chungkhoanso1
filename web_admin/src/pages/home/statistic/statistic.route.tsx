import ErrorPage from "@/components/error_page";
import { RouteObject } from "react-router-dom";
import ForeignPage from "./foreign";
import StatisticLayout from "./statistic.layout";

const route: RouteObject = {
  path: "/statistic",
  errorElement: <ErrorPage />,
  element: <StatisticLayout />,
  children: [
    {
      path: "/statistic/foreign",
      element: <ForeignPage />,
    },
  ],
};
export default route;
