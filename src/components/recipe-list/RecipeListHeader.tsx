import {
  Stack,
  Box,
  FormControl,
  InputLabel,
  Pagination,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ChangeEvent } from "react";
import { useRecipeListStore } from "../../store/recipe-list-filter";
import { MealTypeWithAll, RecipeDifficultyWithAll } from "../../core/enums";
import { MealType, RecipeDifficulty } from "../../core/interfaces";

function RecipeListHeader({ totalPages = 1 }: { totalPages: number }) {
  const page = useRecipeListStore((s) => s.page);
  const setPage = useRecipeListStore((s) => s.setPage);
  const handlePageChange = (event: ChangeEvent<unknown>, value: number) =>
    setPage(value);

  const mealType = useRecipeListStore((s) => s.mealType);
  const setMealType = useRecipeListStore((s) => s.setMealType);
  const handleMealTypeChange = (event: SelectChangeEvent<string>) =>
    setMealType(event.target.value as MealType);

  const difficulty = useRecipeListStore((s) => s.difficulty);
  const setDifficulty = useRecipeListStore((s) => s.setDifficulty);
  const handleDifficultyChange = (event: SelectChangeEvent<string>) =>
    setDifficulty(event.target.value as RecipeDifficulty);

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        paddingBottom: "1rem",
        alignItems: "center",
      }}
    >
      <Stack direction={"row"} gap={1}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Meal type</InputLabel>
            <Select
              labelId="mealType-label"
              id="mealType"
              name="mealType"
              label="Meal type"
              value={mealType}
              onChange={handleMealTypeChange}
            >
              {Object.entries(MealTypeWithAll).map((value) => (
                <MenuItem key={value[1]} value={value[1]}>
                  {value[0]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="difficulty-label">Difficulty</InputLabel>
            <Select
              labelId="difficulty-label"
              id="difficulty"
              name="difficulty"
              label="Difficulty"
              value={difficulty}
              onChange={handleDifficultyChange}
            >
              {Object.entries(RecipeDifficultyWithAll).map((value) => (
                <MenuItem key={value[1]} value={value[1]}>
                  {value[0]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Stack>
      <Pagination
        count={totalPages ?? 1}
        page={page}
        onChange={handlePageChange}
      />
    </header>
  );
}

export default RecipeListHeader;
