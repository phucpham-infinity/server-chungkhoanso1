import React from "react";
import ReactDOM from "react-dom/client";

import ThemeProvider from "./theme";
import RouterProvider from "./router";
import ServerProvider from "./server";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ServerProvider>
      <ThemeProvider>
        <RouterProvider />
      </ThemeProvider>
    </ServerProvider>
  </React.StrictMode>
);
