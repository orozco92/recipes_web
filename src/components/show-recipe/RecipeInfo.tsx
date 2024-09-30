import { Grid2 as Grid, Typography } from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { MealType, RecipeDifficulty } from "../../core/interfaces";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

type Props = {
  cookingTime: number;
  servings: number;
  calories: number;
  difficulty?: RecipeDifficulty | "";
  mealType?: MealType | "";
};
export function RecipeInfo({
  cookingTime,
  servings,
  calories,
  difficulty,
  mealType,
}: Props) {
  const titleCase = (text: string) =>
    text
      ? text?.charAt(0).toUpperCase() + text?.substring(1).toLocaleLowerCase()
      : "";

  return (
    <Grid container columns={{ xs: 2, sm: 3 }}>
      <Grid size={1}>
        <Typography variant="body1">
          <AccessTimeFilledIcon sx={{ verticalAlign: "middle" }} />
          Cooking time {cookingTime} minutes
        </Typography>
      </Grid>
      <Grid size={1}>
        <Typography variant="body1">
          <RestaurantIcon sx={{ verticalAlign: "middle" }} /> Total servings{" "}
          {servings}
        </Typography>
      </Grid>
      <Grid size={1}>
        <Typography variant="body1">
          <WhatshotIcon sx={{ verticalAlign: "middle" }} /> Calories {calories}
        </Typography>
      </Grid>
      <Grid size={1}>
        <Typography variant="body1">
          <KeyboardDoubleArrowUpIcon sx={{ verticalAlign: "middle" }} />{" "}
          {titleCase(difficulty as string)} difficulty
        </Typography>
      </Grid>
      <Grid size={1}>
        <Typography variant="body1">
          <LocalDiningIcon sx={{ verticalAlign: "middle" }} />
          {titleCase(mealType as string)}
        </Typography>
      </Grid>
    </Grid>
  );
}
