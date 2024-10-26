import "./App.css";
import { Box, Container } from "@mui/material";
import ResponsiveAppBar from "./components/app-bar/ResponsiveAppBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "./store/auth";
import { useEffect } from "react";
import { getFavoriteIds, getProfileData } from "./services/profile";
import { useFavoritesStore } from "./store/favorites";
import { updateAccessToken } from "./services/auth";
import { DialogsProvider } from "@toolpad/core/useDialogs";

const queryClient = new QueryClient();

function App() {
  const token = useAuthStore((s) => s.token);
  const setUser = useAuthStore((s) => s.setUser);
  const setToken = useAuthStore((s) => s.setToken);
  const setFavorites = useFavoritesStore((s) => s.setFavorites);
  useEffect(() => {
    if (token) {
      getProfileData()
        .then((profile) => {
          if (!profile) throw new Error();
          setUser(profile);
          return getFavoriteIds();
        })
        .then((favorites) => setFavorites(favorites ?? []))
        .catch(() => {
          setToken(null);
          updateAccessToken();
        });
    } else {
      setUser(null);
      setFavorites([]);
    }
  }, [token]);

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
          paddingTop: "20px",
          // paddingBottom: "20px",
        }}
      >
        <Container>
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
