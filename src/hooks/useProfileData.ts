import { useEffect } from "react";
import { updateAccessToken } from "../services/auth";
import { getProfileData, getFavoriteIds } from "../services/profile";
import { useAuthStore } from "../store/auth";
import { useFavoritesStore } from "../store/favorites";

export function useProfileData() {
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
  }, [setFavorites, setToken, setUser, token]);
}
