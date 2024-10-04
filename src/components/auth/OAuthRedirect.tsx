import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import { getProfileData } from "../../services/profile";
import { updateAccessToken } from "../../services/auth";

const OAuthRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const setToken = useAuthStore((s) => s.setToken);
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      setToken(token);
      updateAccessToken(token);
      getProfileData()
        .then((data) => setUser(data))
        .finally(() => navigate("/"));
    }
  }, [location, navigate, setToken, setUser]);

  return <div>Loading...</div>;
};

export default OAuthRedirect;
