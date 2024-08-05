import "./App.css";
import { Button, Container, Typography } from "@mui/material";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { CreateRecipe } from "./components/NewRecipe";

function App() {
  return (
    <>
      <ResponsiveAppBar />
      <Typography variant="h2" component="h1">
        Hello
      </Typography>
      <Button variant="outlined">Hello world</Button>
      <Container fixed>
        <CreateRecipe></CreateRecipe>
      </Container>
    </>
  );
}

export default App;
