import { Avatar, Button, Stack, styled } from "@mui/material";
import { useState, ChangeEvent } from "react";
import { updateProfilePicture } from "../../services/profile";
import { useNotifications } from "@toolpad/core";
import { useAuthStore } from "../../store/auth";

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

type Props = { profilePicture?: string };

export function ChangeProfilePicture({ profilePicture }: Props) {
  const notifications = useNotifications();
  const setUser = useAuthStore((s) => s.setUser);
  const [image, setImage] = useState<string>(profilePicture ?? "");

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);
    if (!file) return;
    updateProfilePicture(file)
      .then((data) => {
        setUser(data);
        setImage(data?.picture ?? "");
        notifications.show("Profile picture updated", {
          severity: "success",
          autoHideDuration: 3000,
        });
      })
      .catch(() => {
        notifications.show("Profile picture update error", {
          severity: "error",
          autoHideDuration: 3000,
        });
      });
  };

  return (
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
        />
      </Button>
    </Stack>
  );
}
