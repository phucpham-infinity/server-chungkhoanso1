import ErrorPage from "@/components/error_page";
import { RouteObject } from "react-router-dom";

import InvestmentListPage from "./investment-list";
import { utilitiesLoader } from "./utilities.loader";
import UtilitiesLayout from "./utilities.layout";
import RootBoundary from "@/components/root-boundary";

const route: RouteObject = {
  path: "/utilities",
  errorElement: <ErrorPage />,
  ErrorBoundary: RootBoundary,
  element: <UtilitiesLayout />,
  children: [
    {
      loader: utilitiesLoader,
      path: "/utilities/investment-list",
      element: <InvestmentListPage />,
    },
  ],
};
export default route;
