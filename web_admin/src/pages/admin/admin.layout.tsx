import Sidebar from "@/components/sidebar/Sidebar";
import * as CK from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { BiHomeAlt2, BiBarChartAlt2 } from "react-icons/bi";
import Navbar from "@/components/navbar/NavbarAdmin";
import useAdminBloc from "./admin.bloc";

const AdminPage = () => {
  const { onOpen } = CK.useDisclosure();
  const { handleLogout, user, title, title1 } = useAdminBloc();

  return (
    <CK.Box>
      <Sidebar
        routes={[
          {
            name: "Main Dashboard",
            path: "/dashboard",
            layout: "/admin",
            icon: (
              <CK.Icon
                as={BiHomeAlt2}
                width="24px"
                height="24px"
                color="inherit"
              />
            ),
          },
          {
            name: "Giao dịch",
            path: "/chart/chart_1",
            layout: "/admin",
            icon: (
              <CK.Icon
                as={BiBarChartAlt2}
                width="24px"
                height="24px"
                color="inherit"
              />
            ),
          },
          {
            name: "CP vốn hóa / GTDG",
            path: "/chart/capitalization",
            layout: "/admin",
            icon: (
              <CK.Icon
                as={BiBarChartAlt2}
                width="24px"
                height="24px"
                color="inherit"
              />
            ),
          },
          {
            name: "Ngành nghề",
            path: "/chart/industry",
            layout: "/admin",
            icon: (
              <CK.Icon
                as={BiBarChartAlt2}
                width="24px"
                height="24px"
                color="inherit"
              />
            ),
          },
          {
            name: "Tự doanh",
            path: "/chart/proprietary",
            layout: "/admin",
            icon: (
              <CK.Icon
                as={BiBarChartAlt2}
                width="24px"
                height="24px"
                color="inherit"
              />
            ),
          },
          {
            name: "Tổ chức / cá nhân",
            path: "/chart/institution-individual",
            layout: "/admin",
            icon: (
              <CK.Icon
                as={BiBarChartAlt2}
                width="24px"
                height="24px"
                color="inherit"
              />
            ),
          },
        ]}
        display="none"
      />
      <CK.Box
        float="right"
        minHeight="100vh"
        height="100%"
        overflow="auto"
        position="relative"
        maxHeight="100%"
        w={{ base: "100%", xl: "calc( 100% - 290px )" }}
        maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}
        transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
        transitionDuration=".2s, .2s, .35s"
        transitionProperty="top, bottom, width"
        transitionTimingFunction="linear, linear, ease"
      >
        <CK.Portal>
          <CK.Box>
            <Navbar
              onLogout={() => {
                handleLogout();
              }}
              user={user}
              onOpen={onOpen}
              logoText={"Dashboard"}
              brandText={title1}
              pageText={title}
              fixed={false}
              secondary={false}
            />
          </CK.Box>
        </CK.Portal>
        <CK.Box
          mx="auto"
          p={{ base: "20px", md: "30px" }}
          pr="20px"
          minH="100vh"
          pt="50px"
        >
          <Outlet />
        </CK.Box>
      </CK.Box>
    </CK.Box>
  );
};

export default AdminPage;
