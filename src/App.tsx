import "./App.css";
import { Container } from "@mui/material";
import ResponsiveAppBar from "./components/app-bar/ResponsiveAppBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ResponsiveAppBar />
      <Container fixed style={{ paddingTop: 20 }}>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </Container>
    </>
  );
}

export default App;
