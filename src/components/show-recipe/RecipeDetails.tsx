import { Divider, Skeleton, Stack, Typography } from "@mui/material";
import { Recipe } from "../../core/interfaces";
import { IngredientsDetail } from "./IngredientsDetail";
import { StepsDetail } from "./StepsDetail";
import { RecipeInfo } from "./RecipeInfo";

type Props = Recipe;

export function RecipeDetails({
  name,
  calories,
  cookingTime,
  difficulty,
  ingredients,
  mealType,
  picture,
  servings,
  steps,
}: Props) {
  return (
    <>
      <Stack>
        <img
          src={picture}
          alt={`picture of ${name}`}
          loading="lazy"
          style={{
            height: "30rem",
            objectFit: "cover",
          }}
        />
      </Stack>
      <Typography variant="h2" component={"h1"} pt={"1rem"} pb={"1rem"}>
        {name}
      </Typography>
      <RecipeInfo
        cookingTime={cookingTime}
        servings={servings}
        calories={calories}
        difficulty={difficulty}
        mealType={mealType}
      />
      <Divider sx={{ pt: "1rem" }} />
      <IngredientsDetail ingredients={ingredients} />
      <Divider sx={{ pt: "1rem" }} />
      <StepsDetail steps={steps} />
    </>
  );
}

export function RecipeDetailLoading() {
  return (
    <>
      <Skeleton variant="rounded" sx={{ height: "20rem" }} />
      <Typography variant="h1">
        <Skeleton />
      </Typography>
      <Typography variant="subtitle1">
        <Skeleton variant="text" />
      </Typography>
      <Typography variant="body1">
        <Skeleton variant="text" />
      </Typography>
      <Typography variant="body1">
        <Skeleton variant="text" />
      </Typography>
      <Typography variant="body1">
        <Skeleton variant="text" />
      </Typography>
      <Skeleton variant="rounded" sx={{ height: "10rem", marginTop: "1rem" }} />
    </>
  );
}
