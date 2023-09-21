import React from "react";
import useAppStore from "@/store";
import { Navigate } from "react-router-dom";
import * as CK from "@chakra-ui/react";
import { axios } from "@/server";
import { LOCAL_VARIABLE } from "@/constant";

interface IAuthenticationRouter {
  children: React.ReactElement;
  isUnAuthorized?: boolean;
  replaceTo?: string;
}

const AuthenticationRouter = (props: IAuthenticationRouter) => {
  const { children, replaceTo = "/", isUnAuthorized } = props;
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  const [isLoading, setIsLoading] = React.useState(true);
  const { setUser, setToken, setError } = useAppStore();

  const getMe = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        url: "/users/me",
        method: "GET",
      });
      if (response?.data?.is_admin) {
        setUser(response?.data);
        setToken(localStorage.getItem(LOCAL_VARIABLE.USER_TOKEN));
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getMe();
  }, []);

  if (isLoading) {
    return <CK.Text>Loading...</CK.Text>;
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
