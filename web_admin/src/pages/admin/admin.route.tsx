import AdminLayout from "./admin.layout";
import AuthenticationRouter from "@/components/authentication_router";
import { RouteObject, Navigate } from "react-router-dom";
import Dashboard from "./dashboard";
import ChartLayout from "./chart/chart.layout";
import Chart1Page from "./chart/foreign-transactions";
import CapitalizationPage from "./chart/capitalization";
import IndustryPage from "./chart/industry";
import ProprietaryPage from "./chart/proprietary";

const route: RouteObject = {
  path: "/admin",
  element: (
    <AuthenticationRouter>
      <AdminLayout />
    </AuthenticationRouter>
  ),
  children: [
    {
      path: "/admin",
      element: <Navigate to={"/admin/dashboard"} replace />,
    },
    {
      path: "/admin/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/admin/chart",
      element: <ChartLayout />,
      children: [
        {
          path: "/admin/chart/chart_1",
          element: <Chart1Page />,
        },
        {
          path: "/admin/chart/capitalization",
          element: <CapitalizationPage />,
        },
        {
          path: "/admin/chart/industry",
          element: <IndustryPage />,
        },
        {
          path: "/admin/chart/proprietary",
          element: <ProprietaryPage />,
        },
      ],
    },
  ],
};
export default route;
