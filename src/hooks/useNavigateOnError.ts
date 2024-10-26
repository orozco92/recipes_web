import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

export function use401ErrorHandler() {
  const navigate = useNavigate();
  const setToken = useAuthStore((s) => s.setToken);
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    const unauthorizedInterceptorId = axios.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error.response.status === 401) {
          setToken(null);
          setUser(null);
          navigate("/");
        }
        return error;
      }
    );
    return () => axios.interceptors.response.eject(unauthorizedInterceptorId);
  }, []);
}
