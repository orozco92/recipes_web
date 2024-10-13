import { Stack, Typography, Button, TextField, Skeleton } from "@mui/material";
import { FormEvent } from "react";
import { updateProfileData } from "../../services/profile";
import { UpdateProfileDto } from "../../core/interfaces";
import { useAuthStore } from "../../store/auth";
import { useNotifications } from "@toolpad/core";
import { useValidationErrors } from "../../hooks/useValidationErrors";
import { ChangeProfilePicture } from "./ChangeProfilePicture";

interface Props {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
}

export function ProfileData({
  username,
  email,
  firstName,
  lastName,
  profilePicture,
}: Props) {
  const { errors, setValidationError } = useValidationErrors();
  const setUser = useAuthStore((s) => s.setUser);
  const notifications = useNotifications();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const dto = Object.fromEntries(formData) as unknown as UpdateProfileDto;
    updateProfileData(dto)
      .then((data) => {
        setUser(data);
        notifications.show("Profile data updated", {
          severity: "success",
          autoHideDuration: 3000,
        });
      })
      .catch((err) => {
        notifications.show("Profile update error", {
          severity: "error",
          autoHideDuration: 3000,
        });
        setValidationError(err);
      });
  };

  return (
    <Stack spacing={1} component={"form"} onSubmit={handleSubmit}>
      <Typography variant="h4">Profile data</Typography>
      <ChangeProfilePicture profilePicture={profilePicture} />
      <TextField
        id="email"
        name="email"
        label="Email"
        variant="outlined"
        disabled
        defaultValue={email}
      />
      <TextField
        id="username"
        name="username"
        label="Username"
        variant="outlined"
        error={!!errors["username"]}
        helperText={errors["username"]}
        defaultValue={username}
      />
      <TextField
        id="firstName"
        name="firstName"
        label="First name"
        variant="outlined"
        defaultValue={firstName}
      />
      <TextField
        id="lastName"
        name="lastName"
        label="Last name"
        variant="outlined"
        defaultValue={lastName}
      />
      <Button variant="contained" type="submit" disableElevation>
        Update profile
      </Button>
    </Stack>
  );
}

export function LoadingProfileData() {
  return (
    <Stack spacing={1} sx={{ justifyContent: "stretch" }}>
      <Typography variant="h4">Profile data</Typography>
      <Stack spacing={0.5} justifyContent={"center"} alignItems={"center"}>
        <Skeleton variant="rounded" width={"15rem"} height={"15rem"}></Skeleton>
        <Skeleton variant="rectangular">
          <Button
            component="label"
            variant="contained"
            sx={{ width: "15rem" }}
          ></Button>
        </Skeleton>
      </Stack>
      <Skeleton variant="rectangular" width={"100%"}>
        <TextField variant="outlined"></TextField>
      </Skeleton>
      <Skeleton variant="rectangular" width={"100%"}>
        <TextField variant="outlined"></TextField>
      </Skeleton>
      <Skeleton variant="rectangular" width={"100%"}>
        <TextField variant="outlined"></TextField>
      </Skeleton>
      <Skeleton variant="rectangular" width={"100%"}>
        <TextField variant="outlined"></TextField>
      </Skeleton>
    </Stack>
  );
}
