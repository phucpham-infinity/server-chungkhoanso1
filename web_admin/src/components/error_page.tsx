import * as CK from "@chakra-ui/react";
const ErrorPage = () => {
  return (
    <CK.Center w="100vw" h="100vh">
      <CK.Text fontStyle={"2xl"} fontWeight={"bold"}>
        Oops! Bạn không có quyền truy cập
      </CK.Text>
    </CK.Center>
  );
};

export default ErrorPage;
