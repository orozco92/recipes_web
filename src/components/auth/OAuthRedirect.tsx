import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import { updateAccessToken } from "../../services/auth";

const OAuthRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const setToken = useAuthStore((s) => s.setToken);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      setToken(token);
      updateAccessToken(token);
      navigate("/");
    }
  }, [location, navigate, setToken]);

  return <div>Loading...</div>;
};

export default OAuthRedirect;
