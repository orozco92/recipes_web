import { Stack, Button, Typography } from "@mui/material";
import { FormEvent } from "react";
import { useValidationErrors } from "../../hooks/useValidationErrors";
import { updatePassword } from "../../services/profile";
import { UpdatePasswordDto } from "../../core/interfaces";
import { useNotifications } from "@toolpad/core";
import { ValidationError } from "../../core/errors";
import { PasswordTextField } from "../utils/PasswordTextField";

export function ChangeProfilePassword() {
  const { errors, setValidationError } = useValidationErrors();
  const notifications = useNotifications();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const dto = Object.fromEntries(formData);
    delete dto.repeatPassword;

    updatePassword(dto as unknown as UpdatePasswordDto)
      .then(() => {
        notifications.show("Password updated", {
          severity: "success",
          autoHideDuration: 3000,
        });
      })
      .catch((err) => {
        if ((err as ValidationError).validationErrors) setValidationError(err);
        else
          notifications.show("Update password error", {
            severity: "error",
            autoHideDuration: 3000,
          });
      });
  };
  return (
    <Stack spacing={1} component={"form"} onSubmit={handleSubmit}>
      <Typography variant="h4">Password</Typography>
      <PasswordTextField id="oldPassword" name="oldPassword" label="Password" />
      <PasswordTextField
        id="newPassword"
        name="newPassword"
        label="New password"
        error={!!errors["newPassword"]}
        helperText={errors["newPassword"]}
      />
      <PasswordTextField
        id="repeatPassword"
        name="repeatPassword"
        label="Repeat password"
      />
      <Button type="submit" variant="contained" disableElevation>
        Update password
      </Button>
    </Stack>
  );
}
