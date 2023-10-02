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
    let timer = setInterval(iframeHeightNotify, 300);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <Outlet />;
};

export default Layout;
