import "./App.css";
import { Button, Typography } from "@mui/material";
import ResponsiveAppBar from "./components/ResponsiveAppBar";

function App() {
  return (
    <>
      <ResponsiveAppBar />
      <Typography variant="h2" component="h1">
        Hello
      </Typography>
      <Button variant="outlined">Hello world</Button>
    </>
  );
}

export default App;
