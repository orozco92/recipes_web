import { Stack } from "@mui/material";
import { ChangeProfilePassword } from "./ChangeProfilePassword";
import { LoadingProfileData, ProfileData } from "./ProfileData";
import { useQuery } from "@tanstack/react-query";
import { getProfileData } from "../../services/profile";

export function Profile() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getProfile"],
    queryFn: () => getProfileData(),
    retry: 1,
  });

  return (
    <Stack spacing={5} sx={{ maxWidth: "sm", margin: "auto" }}>
      {isLoading ? (
        <LoadingProfileData />
      ) : (
        <ProfileData
          email={data?.email}
          username={data?.username}
          profilePicture={data?.picture}
          firstName={data?.firstName}
          lastName={data?.lastName}
        />
      )}
      <ChangeProfilePassword />
    </Stack>
  );
}
