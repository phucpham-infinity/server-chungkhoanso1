import { Outlet } from "react-router-dom";
import * as CK from "@chakra-ui/react";

const ChartLayout = () => {
  return (
    <CK.Box px={6} pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Outlet />
    </CK.Box>

  )
}

export default ChartLayout