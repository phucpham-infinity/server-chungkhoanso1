import { useMutation } from "@tanstack/react-query";
import { pb } from "@/server";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import useAppStore from "@/store";
import { useNavigate } from "react-router-dom";

interface IUser {
  email: string;
  password: string;
}

const useAuthBloc = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const handleLogin = useMutation((user: IUser) => {
    return pb.collection("users").authWithPassword(user.email, user.password);
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
      setUser(handleLogin.data.record);
      setToken(handleLogin.data.token);
      navigate("/admin");
    }
  }, [handleLogin.data, handleLogin.isSuccess]);

  return { handleLogin };
};

export default useAuthBloc;
