import { Stack, TextField, Typography } from "@mui/material";

export function Steps() {
  return (
    <>
      <Stack gap={2}>
        <Typography variant="h5" textAlign="left">
          Steps
        </Typography>
        <TextField id="steps" label="Steps" multiline rows={10} />
      </Stack>
    </>
  );
}
