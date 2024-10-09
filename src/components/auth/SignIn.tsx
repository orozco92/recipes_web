import {
  AuthProvider,
  AppProvider,
  SignInPage,
  useNotifications,
} from "@toolpad/core";
import { useTheme } from "@mui/material/styles";
import { useAuthStore } from "../../store/auth";
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";

const providers: AuthProvider[] = [
  { id: "credentials", name: "Email and Password" },
  // { id: "facebook", name: "Facebook" },
  { id: "google", name: "Google" },
];

export default function SignIn() {
  const theme = useTheme();
  const notifications = useNotifications();

  const setToken = useAuthStore((s) => s.setToken);
  const navigate = useNavigate();

  const signIn: (provider: AuthProvider, data: FormData) => void = async (
    provider,
    data
  ) => {
    if (provider.id === "credentials") {
      const credentials = Object.fromEntries(data) as Record<string, string>;
      const authData = await login(credentials.email, credentials.password);
      if (authData) {
        setToken(authData.accessToken);
        navigate("/");
      } else {
        notifications.show("Wrong username or password", {
          severity: "error",
          autoHideDuration: 3000,
        });
      }
    }
    if (provider.id === "google") {
      window.location.href = "http://localhost:3000/auth/google";
    }
  };

  return (
    <AppProvider theme={theme}>
      <SignInPage signIn={signIn} providers={providers} />
    </AppProvider>
  );
}
