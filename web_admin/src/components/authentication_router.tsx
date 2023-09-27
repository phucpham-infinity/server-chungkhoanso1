import React, { useEffect, useState } from "react";
import useAppStore from "@/store";
import { Navigate } from "react-router-dom";
import * as CK from "@chakra-ui/react";
import { axios } from "@/server";
import { LOCAL_VARIABLE } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import Logo from "@/assets/images/logo.svg";

interface IAuthenticationRouter {
  children: React.ReactElement;
  isUnAuthorized?: boolean;
  replaceTo?: string;
}

const AuthenticationRouter = (props: IAuthenticationRouter) => {
  const { children, replaceTo = "/", isUnAuthorized } = props;
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  const { setUser, setToken, setError } = useAppStore();

  const { isSuccess, data, error, isError } = useQuery({
    queryKey: ["me"],
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    queryFn: () => {
      return axios({
        url: "/users/me",
        method: "GET",
      });
    },
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isSuccess && !isEmpty(data)) {
      if (data.data.is_admin) {
        setUser(data.data);
        setToken(localStorage.getItem(LOCAL_VARIABLE.USER_TOKEN));
        setIsLoading(false);
      } else {
        setError(new Error("Admin permission required"));
        setIsLoading(false);
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError && !isEmpty(error)) {
      setError(error);
      setIsLoading(false);
    }
  }, [isError]);

  if (isLoading) {
    return (
      <CK.Center h={"100vh"} w={"100vw"}>
        <CK.VStack>
          <CK.Image w={"100px"} src={Logo} />
          <CK.Spinner />
        </CK.VStack>
      </CK.Center>
    );
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
