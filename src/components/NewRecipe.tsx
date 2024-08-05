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
import { MealType, RecipeDifficulty } from "../core/enums";
import { Ingredients } from "./Ingredients";
import { useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export function CreateRecipe() {
  const [category, setCategory] = useState<MealType | "">("");
  const [difficulty, setDifficulty] = useState<RecipeDifficulty | "">("");

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as MealType);
  };

  const handleDifficultyChange = (event: SelectChangeEvent) => {
    setDifficulty(event.target.value as RecipeDifficulty);
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
                />
              </Item>
            </Grid>
            <Grid item xs={6} md={4}>
              <Item>
                <FormControl fullWidth>
                  <InputLabel id="category">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    name="category"
                    label="Category"
                    value={category}
                    onChange={handleCategoryChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {Object.entries(MealType).map((value) => (
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
                />
              </Item>
            </Grid>
            <Grid item xs={6} md={3}>
              <Item>
                <FormControl fullWidth>
                  <InputLabel id="difficulty">Difficulty</InputLabel>
                  <Select
                    labelId="category-label"
                    id="difficulty"
                    name="difficulty"
                    label="Difficulty"
                    value={difficulty}
                    onChange={handleDifficultyChange}
                  >
                    {Object.entries(RecipeDifficulty).map((value) => (
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
        </CardContent>
        <CardActions>
          <Button variant="outlined">Save</Button>
          <Button variant="text">Cancel</Button>
        </CardActions>
      </Card>
    </>
  );
}
