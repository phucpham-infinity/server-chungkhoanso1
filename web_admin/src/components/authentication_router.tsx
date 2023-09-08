import React from "react";
import useAppStore from "@/store";
import { Navigate } from "react-router-dom";

interface IAuthenticationRouter {
  children: React.ReactElement;
  isUnAuthorized?: boolean;
  replaceTo?: string;
}

const AuthenticationRouter = (props: IAuthenticationRouter) => {
  const { children, replaceTo = "/", isUnAuthorized } = props;
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  if (isUnAuthorized) {
    return !isAuthenticated ? children : <Navigate to={replaceTo} replace />;
  } else {
    return isAuthenticated ? children : <Navigate to={"/auth/login"} replace />;
  }
};

export default AuthenticationRouter;
