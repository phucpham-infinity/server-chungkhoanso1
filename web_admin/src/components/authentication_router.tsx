import React from "react";
import useAppStore from "@/store";
import { Navigate } from "react-router-dom";
import * as CK from "@chakra-ui/react";
import { pb } from "@/server";
interface IAuthenticationRouter {
  children: React.ReactElement;
  isUnAuthorized?: boolean;
  replaceTo?: string;
}

const AuthenticationRouter = (props: IAuthenticationRouter) => {
  const { children, replaceTo = "/", isUnAuthorized } = props;
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const [isLoading, setIsLoading] = React.useState(true);
  const { setUser, setToken } = useAppStore();

  React.useEffect(() => {
    if (pb.authStore.isValid) {
      setIsLoading(false);
      setToken(pb.authStore.token);
      setUser(pb.authStore.model);
    } else {
      setIsLoading(false);
    }
  }, [pb.authStore]);

  if (isLoading) {
    return <CK.Text>Loading</CK.Text>;
  } else {
    if (isUnAuthorized) {
      return !isAuthenticated ? children : <Navigate to={replaceTo} replace />;
    } else {
      return isAuthenticated ? (
        children
      ) : (
        <Navigate to={"/auth/login"} replace />
      );
    }
  }
};

export default AuthenticationRouter;
