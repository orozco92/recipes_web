import "./App.css";
import { Box, Container } from "@mui/material";
import ResponsiveAppBar from "./components/app-bar/ResponsiveAppBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { DialogsProvider } from "@toolpad/core/useDialogs";
import { use401ErrorHandler } from "./hooks/useNavigateOnError";
import { useProfileData } from "./hooks/useProfileData";

const queryClient = new QueryClient();

function App() {
  use401ErrorHandler();
  useProfileData();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        height: "100vh",
      }}
    >
      <ResponsiveAppBar />
      <Box
        component={"main"}
        sx={{
          overflowY: "auto",
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}
      >
        <Container sx={{ height: "100%" }}>
          <QueryClientProvider client={queryClient}>
            <DialogsProvider>
              <Outlet />
            </DialogsProvider>
          </QueryClientProvider>
        </Container>
      </Box>
    </div>
  );
}

export default App;
