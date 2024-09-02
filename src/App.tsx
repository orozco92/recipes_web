import "./App.css";
import { Container } from "@mui/material";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import RecipeList from "./components/recipe-list/RecipeList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ResponsiveAppBar />
      <Container fixed style={{ paddingTop: 20 }}>
        <QueryClientProvider client={queryClient}>
          <RecipeList></RecipeList>
        </QueryClientProvider>
      </Container>
    </>
  );
}

export default App;
