import {
  Stack,
  Typography,
  Avatar,
  Button,
  TextField,
  styled,
  Skeleton,
} from "@mui/material";
import { useState, ChangeEvent, FormEvent } from "react";
import { updateProfileData } from "../../services/profile";
import { UpdateProfileDto } from "../../core/interfaces";
import { useAuthStore } from "../../store/auth";
import { useNotifications } from "@toolpad/core";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [image, setImage] = useState<string>(profilePicture ?? "");
  const setUser = useAuthStore((s) => s.setUser);
  const notifications = useNotifications();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setImage(reader.result?.toString() ?? "");
    };
  };

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
        if (err && err.validationErrors) {
          const e: Record<string, string> = {};
          for (const [key, value] of Object.entries<Record<string, string>>(
            err.validationErrors
          )) {
            e[key] = Object.values(value).join(", ");
          }
          setErrors(e);
        }
      });
  };

  return (
    <Stack spacing={1} component={"form"} onSubmit={handleSubmit}>
      <Typography variant="h4">Profile data</Typography>
      <Stack justifyContent={"center"} alignItems={"center"}>
        <Avatar
          alt="Profile image"
          src={image}
          variant="square"
          sx={{ width: "15rem", height: "15rem" }}
        />

        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          disableElevation
          sx={{ width: "15rem" }}
        >
          Change picture
          <VisuallyHiddenInput
            type="file"
            onChange={handleImageChange}
            multiple
          />
        </Button>
      </Stack>
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
