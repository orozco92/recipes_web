import { Button, ButtonBase, styled } from "@mui/material";
import { ChangeEvent, useEffect } from "react";
import { useUpsertRecipeStore } from "../../store/recipe";

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 400,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

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

export function UpserRecipePicture() {
  const picture = useUpsertRecipeStore((s) => s.picture);
  const setPicture = useUpsertRecipeStore((s) => s.setPicture);
  const setPictureFile = useUpsertRecipeStore((s) => s.setPictureFile);
  const resetState = useUpsertRecipeStore((s) => s.reset);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);
    if (!file) return;
    setPictureFile(file);
    const fileReader = new FileReader();
    fileReader.onloadend = () => setPicture(fileReader.result?.toString());
    fileReader.readAsDataURL(file);
  };

  useEffect(() => resetState(), []);

  return (
    <>
      <ImageButton sx={{ width: "100%" }}>
        <ImageSrc
          style={{
            backgroundImage: `url("${picture}")`,
          }}
        />
        <ImageBackdrop className="MuiImageBackdrop-root" />

        <Button
          component={"label"}
          role={undefined}
          variant="text"
          tabIndex={-1}
          disableElevation
          sx={(theme) => ({
            p: 4,
            pt: 2,
            pb: `calc(${theme.spacing(1)} + 6px)`,
            color: theme.palette.common.white,
            border: "0.25rem solid",
            backgroundColor: "rgba(0,0,0,0.6)",
          })}
        >
          Upload recipe image
          <VisuallyHiddenInput
            type="file"
            onChange={handleImageChange}
            multiple
          />
        </Button>
      </ImageButton>
    </>
  );
}
