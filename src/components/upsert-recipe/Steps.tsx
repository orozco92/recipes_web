import { Stack, TextField, Typography } from "@mui/material";
import { ChangeEvent } from "react";
import { useUpsertRecipeStore } from "../../store/recipe";

export function Steps() {
  const steps = useUpsertRecipeStore((data) => data.data.steps);
  const updateSteps = useUpsertRecipeStore((data) => data.updateSteps);
  const handleStepsChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    updateSteps(event.target.value);
  return (
    <>
      <Stack gap={2}>
        <Typography variant="h5" textAlign="left">
          Steps
        </Typography>
        <TextField
          id="steps"
          label="Steps"
          multiline
          rows={10}
          value={steps[0]?.description || ""}
          onChange={handleStepsChange}
        />
      </Stack>
    </>
  );
}
