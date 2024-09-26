import { AuthProvider, AppProvider, SignInPage } from "@toolpad/core";
import { useTheme } from "@mui/material/styles";

const providers: AuthProvider[] = [
  { id: "credentials", name: "Email and Password" },
  { id: "facebook", name: "Facebook" },
  { id: "google", name: "Google" },
];

const signIn: (provider: AuthProvider, data: FormData) => void = async (
  provider,
  data
) => {
  const promise = new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log(`Sign in with ${provider.id}`);
      console.log(Object.fromEntries(data));
      resolve();
    }, 500);
  });
  return promise;
};

export default function SignIn() {
  const theme = useTheme();

  return (
    <AppProvider theme={theme}>
      <SignInPage signIn={signIn} providers={providers} />
    </AppProvider>
  );
}
