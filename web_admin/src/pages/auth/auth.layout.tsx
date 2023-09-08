import { Outlet } from "react-router-dom";
import * as CK from "@chakra-ui/react";

const AuthLayout = () => {
  return (
    <CK.Center w={"100vw"} h={"100vh"} overflow={"hidden"} bgColor={"gray.100"}>
      <Outlet />
    </CK.Center>
  );
};

export default AuthLayout;
