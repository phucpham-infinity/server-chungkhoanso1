import ErrorPage from "@/components/error_page";
import { RouteObject } from "react-router-dom";
import StatisticLayout from "./statistic.layout";

import ForeignPage from "./foreign";
import CapitalizationPage from "./capitalization";
import IndustryPage from "./industry";
import ProprietaryPage from "./proprietary";
import InstitutionIndividualPage from "./institution-individual";

const route: RouteObject = {
  path: "/statistic",
  errorElement: <ErrorPage />,
  element: <StatisticLayout />,
  children: [
    {
      path: "/statistic/foreign",
      element: <ForeignPage />,
    },
    {
      path: "/statistic/capitalization",
      element: <CapitalizationPage />,
    },
    {
      path: "/statistic/industry",
      element: <IndustryPage />,
    },
    {
      path: "/statistic/proprietary",
      element: <ProprietaryPage />,
    },
    {
      path: "/statistic/institution-individual",
      element: <InstitutionIndividualPage />,
    },
  ],
};
export default route;
