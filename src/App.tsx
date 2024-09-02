import "./App.css";
import { Container } from "@mui/material";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { CreateRecipe } from "./components/NewRecipe";

function App() {
  return (
    <>
      <ResponsiveAppBar />
      <Container fixed style={{ paddingTop: 20 }}>
        <CreateRecipe></CreateRecipe>
      </Container>
    </>
  );
}

export default App;
