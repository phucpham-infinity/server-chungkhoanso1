import { Box } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const statisticEL = React.useRef<any>({});
  const iframeHeightNotify = () => {
    window.parent.postMessage(
      { height: statisticEL.current.scrollHeight },
      "*"
    );
  };
  React.useEffect(() => {
    let timer = setInterval(iframeHeightNotify, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box ref={statisticEL}>
      <Outlet />
    </Box>
  );
};

export default Layout;
