import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { MealTypeConst, RecipeDifficultyConst } from "../../core/enums";
import { Ingredients } from "./Ingredients";
import { ChangeEvent, useEffect } from "react";
import { useUpsertRecipeStore } from "../../store/recipe";
import { RecipePrimitives } from "../../core/interfaces";
import { getRecipeData, upsertRecipeWithPicture } from "../../services/recipe";
import { useNavigate, useParams } from "react-router-dom";
import { Steps } from "./Steps";
import Grid from "@mui/material/Grid2";
import { UpserRecipePicture } from "./UpsertRecipePicture";
import { useNotifications } from "@toolpad/core";
import { useQuery } from "@tanstack/react-query";

export function UpsertRecipe() {
  const navigate = useNavigate();
  const recipe = useUpsertRecipeStore((data) => data.data);
  const pictureFile = useUpsertRecipeStore((data) => data.pictureFile);
  const updateRecipeData = useUpsertRecipeStore(
    (data) => data.updateRecipeData
  );
  const setRecipe = useUpsertRecipeStore((data) => data.setRecipe);
  const notifications = useNotifications();

  const { id } = useParams();
  const { data: recipeData } = useQuery({
    queryKey: ["getRecipeData", id],
    queryFn: () => getRecipeData(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (!recipeData) return;
    setRecipe(recipeData);
  }, [recipeData]);

  const createRecipePrimitiveChangeFn =
    (key: RecipePrimitives) =>
    (
      event:
        | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent
    ) => {
      let value: string | number = event.target.value;
      if (key === "calories" || key === "cookingTime" || key === "servings") {
        if (Number.isNaN(+value)) return;
        value = +value;
      }
      updateRecipeData(value, key);
    };

  const saveRecipe = () => {
    const dto = { ...recipe };

    upsertRecipeWithPicture(dto, pictureFile)
      .then(() => {
        navigate(-1);
      })
      .catch(() =>
        notifications.show(`Error ${id ? "updating" : "creating"} the recipe`, {
          severity: "error",
          autoHideDuration: 3000,
        })
      );
  };

  return (
    <>
      <Card variant="outlined">
        <CardHeader title={recipeData?.name ? recipeData.name : "New Recipe"} />
        <CardContent>
          <Grid container spacing={2} mb={2}>
            <Grid size={12}>
              <UpserRecipePicture />
            </Grid>
            <Grid size={{ xs: 6, md: 8 }}>
              <TextField
                id="name"
                name="name"
                label="Title"
                variant="outlined"
                fullWidth={true}
                value={recipe.name}
                onChange={createRecipePrimitiveChangeFn("name")}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="mealType-label">Meal type</InputLabel>
                <Select
                  labelId="mealType-label"
                  id="mealType"
                  name="mealType"
                  label="Meal type"
                  value={recipe.mealType}
                  onChange={createRecipePrimitiveChangeFn("mealType")}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {Object.entries(MealTypeConst).map((value) => (
                    <MenuItem key={value[1]} value={value[1]}>
                      {value[0]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <TextField
                id="cookingTime"
                name="cookingTime"
                label="Cooking time"
                variant="outlined"
                fullWidth={true}
                value={recipe.cookingTime}
                onChange={createRecipePrimitiveChangeFn("cookingTime")}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <TextField
                id="servings"
                name="servings"
                label="Servings"
                variant="outlined"
                fullWidth={true}
                value={recipe.servings}
                onChange={createRecipePrimitiveChangeFn("servings")}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <TextField
                id="calories"
                name="calories"
                label="Calories"
                variant="outlined"
                fullWidth={true}
                value={recipe.calories}
                onChange={createRecipePrimitiveChangeFn("calories")}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <FormControl fullWidth>
                <InputLabel id="difficulty-label">Difficulty</InputLabel>
                <Select
                  labelId="difficulty-label"
                  id="difficulty"
                  name="difficulty"
                  label="Difficulty"
                  value={recipe.difficulty}
                  onChange={createRecipePrimitiveChangeFn("difficulty")}
                >
                  <MenuItem value="BEGINER">
                    <em>None</em>
                  </MenuItem>
                  {Object.entries(RecipeDifficultyConst).map((value) => (
                    <MenuItem key={value[1]} value={value[1]}>
                      {value[0]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Divider />
          <Ingredients></Ingredients>
          <Divider />
          <Steps></Steps>
        </CardContent>
        <CardActions>
          <Button variant="outlined" onClick={saveRecipe}>
            Save
          </Button>
          <Button
            variant="text"
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
