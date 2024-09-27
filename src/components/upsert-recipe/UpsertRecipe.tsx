import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  styled,
  TextField,
} from "@mui/material";
import { MealTypeConst, RecipeDifficultyConst } from "../../core/enums";
import { Ingredients } from "./Ingredients";
import { ChangeEvent } from "react";
import { useUpsertRecipeStore } from "../../store/recipe";
import { RecipePrimitives } from "../../core/interfaces";
import { upsertRecipe } from "../../services/recipe";
import { useNavigate } from "react-router-dom";
import { Steps } from "./Steps";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export function UpsertRecipe() {
  const navigate = useNavigate();
  const recipe = useUpsertRecipeStore((data) => data.data);
  const updateRecipeData = useUpsertRecipeStore(
    (data) => data.updateRecipeData
  );

  const createRecipePrimitiveChangeFn =
    (key: RecipePrimitives) =>
    (
      event:
        | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent
    ) => {
      let value: string | number = event.target.value;
      if (key === "calories" || key === "cookingTime" || key === "servings")
        value = +value;
      updateRecipeData(value, key);
    };

  const saveRecipe = () => {
    upsertRecipe(recipe)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Card variant="outlined">
        <CardHeader title="New Recipe" />
        <CardContent>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={6} md={8}>
              <Item>
                <TextField
                  id="name"
                  name="name"
                  label="Title"
                  variant="outlined"
                  fullWidth={true}
                  value={recipe.name}
                  onChange={createRecipePrimitiveChangeFn("name")}
                />
              </Item>
            </Grid>
            <Grid item xs={6} md={4}>
              <Item>
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
                      <MenuItem key={value[0]} value={value[0]}>
                        {value[1]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6} md={3}>
              <Item>
                <TextField
                  id="cookingTime"
                  name="cookingTime"
                  label="Cooking time"
                  variant="outlined"
                  fullWidth={true}
                  value={recipe.cookingTime}
                  onChange={createRecipePrimitiveChangeFn("cookingTime")}
                />
              </Item>
            </Grid>
            <Grid item xs={6} md={3}>
              <Item>
                <TextField
                  id="servings"
                  name="servings"
                  label="Servings"
                  variant="outlined"
                  fullWidth={true}
                  value={recipe.servings}
                  onChange={createRecipePrimitiveChangeFn("servings")}
                />
              </Item>
            </Grid>
            <Grid item xs={6} md={3}>
              <Item>
                <TextField
                  id="calories"
                  name="calories"
                  label="Calories"
                  variant="outlined"
                  fullWidth={true}
                  value={recipe.calories}
                  onChange={createRecipePrimitiveChangeFn("calories")}
                />
              </Item>
            </Grid>
            <Grid item xs={6} md={3}>
              <Item>
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
                      <MenuItem key={value[0]} value={value[0]}>
                        {value[1]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Item>
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
