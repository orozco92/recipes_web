import { Button, Stack, Typography } from "@mui/material";
import { ErrorResponse, useRouteError } from "react-router-dom";

function DefaultError() {
  const error = useRouteError() as ErrorResponse & {
    statusText: string;
    status: number;
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      gap='0.5rem'
      height="calc(100vh - 10rem)"
    >
      <Typography variant="h1">{error.status}</Typography>
      <Typography variant="h3" component="h1">
        We couldn't find that page
      </Typography>
      <p>
        <i>{error.statusText}</i>
      </p>
      <Button href="/">Go home</Button>
    </Stack>
  );
}

export default DefaultError;
