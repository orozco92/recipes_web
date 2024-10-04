import { AuthProvider, AppProvider, SignInPage } from "@toolpad/core";
import { useTheme } from "@mui/material/styles";
import { useAuthStore } from "../../store/auth";
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { getProfileData } from "../../services/profile";
import { Snackbar, Alert, SnackbarCloseReason } from "@mui/material";
import { useState } from "react";

const providers: AuthProvider[] = [
  { id: "credentials", name: "Email and Password" },
  // { id: "facebook", name: "Facebook" },
  { id: "google", name: "Google" },
];

export default function SignIn() {
  const theme = useTheme();

  const setToken = useAuthStore((s) => s.setToken);
  const setUser = useAuthStore((s) => s.setUser);
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
        const profile = await getProfileData();
        if (profile) setUser(profile);
        navigate("/");
      } else {
        setOpen(true);
      }
    }
    if (provider.id === "google") {
      window.location.href = "http://localhost:3000/auth/google";
    }
  };

  const [open, setOpen] = useState(false);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <AppProvider theme={theme}>
      <SignInPage signIn={signIn} providers={providers} />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Wrong username or password
        </Alert>
      </Snackbar>
    </AppProvider>
  );
}
