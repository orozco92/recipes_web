import "./App.css";
import { Container, Stack } from "@mui/material";
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
    <Stack sx={{ height: "100vh" }}>
      <ResponsiveAppBar />
      <Container
        sx={{
          maxHeight: "100%",
          overflowY: "auto",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <QueryClientProvider client={queryClient}>
          <DialogsProvider>
            <Outlet />
          </DialogsProvider>
        </QueryClientProvider>
      </Container>
    </Stack>
  );
}

export default App;
