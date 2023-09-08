import AdminPage from "./admin.page";
import AuthenticationRouter from "@/components/authentication_router";
const route = {
  path: "/admin",
  element: (
    <AuthenticationRouter>
      <AdminPage />
    </AuthenticationRouter>
  ),
};
export default route;
