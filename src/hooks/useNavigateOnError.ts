import { AxiosError } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useNavigateOnError(error: unknown, to: string) {
  const navigate = useNavigate();

  useEffect(() => {
    const err = error as AxiosError;
    if (err?.status === 401) navigate(to ?? -1);
  }, [error]);
}
