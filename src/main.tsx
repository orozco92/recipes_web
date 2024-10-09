import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { theme } from "./core/theme.ts";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.tsx";
import { NotificationsProvider } from "@toolpad/core/useNotifications";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationsProvider
        slotProps={{
          snackbar: { anchorOrigin: { horizontal: "right", vertical: "top" } },
        }}
      >
        <RouterProvider router={router} />
      </NotificationsProvider>
    </ThemeProvider>
  </React.StrictMode>
);
