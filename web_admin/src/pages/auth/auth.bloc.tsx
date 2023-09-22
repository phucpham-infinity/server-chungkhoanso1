import { useMutation } from "@tanstack/react-query";
import { axios } from "@/server";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import useAppStore from "@/store";
import { useNavigate } from "react-router-dom";
import { LOCAL_VARIABLE } from "@/constant";

interface IUser {
  email: string;
  password: string;
}

const useAuthBloc = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const handleLogin = useMutation((user: IUser) => {
    return axios({
      method: "POST",
      url: "/users/login",
      data: {
        email: user.email,
        password: user.password,
      },
    });
  });
  const { setUser, setToken } = useAppStore();

  useEffect(() => {
    if (handleLogin.isError) {
      const { message } = handleLogin?.error as any;
      toast({
        title: "Login error.",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [handleLogin.isError]);

  useEffect(() => {
    if (handleLogin.data && handleLogin.isSuccess) {
      if (handleLogin?.data?.data?.is_admin) {
        setUser(handleLogin?.data?.data);
        const token = (handleLogin?.data as any)?.token;
        setToken(token);
        localStorage.setItem(LOCAL_VARIABLE.USER_TOKEN, token);
        navigate("/admin");
      } else {
        toast({
          title: "Đăng nhập thất bại",
          description: "Bạn có quyền truy cập trang web.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    }
  }, [handleLogin.data, handleLogin.isSuccess]);

  return { handleLogin };
};

export default useAuthBloc;
