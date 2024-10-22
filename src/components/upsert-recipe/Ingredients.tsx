import { IconButton, List, Stack, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useUpsertRecipeStore } from "../../store/recipe";
import { Ingredient } from "../../core/interfaces";

export function Ingredients() {
  const ingredients =
    useUpsertRecipeStore((data) => data.data.ingredients) ?? [];
  const updateIngredients = useUpsertRecipeStore(
    (data) => data.updateIngredients
  );
  const removeIngredient = useUpsertRecipeStore(
    (data) => data.removeIngredient
  );

  const handleAddIngredient = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const ingredient = Object.fromEntries(
      formData.entries()
    ) as unknown as Ingredient;

    if (!ingredient.name) return;

    updateIngredients(ingredient);

    form.reset();
  };

  const createRemoveHandler = (index: number) => () => {
    removeIngredient(index);
  };

  return (
    <>
      <form onSubmit={handleAddIngredient}>
        <Stack direction="row" justifyContent="space-between" p={1} pl={0}>
          <Typography variant="h5">Ingredients</Typography>
          <IconButton edge="end" aria-label="add-ingredient" type="submit">
            <AddIcon />
          </IconButton>
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            id="name"
            name="name"
            label="Title"
            variant="outlined"
            fullWidth={true}
          />
          <TextField
            id="amount"
            name="amount"
            label="Amount"
            variant="outlined"
            fullWidth={true}
          />
          <TextField
            id="unit"
            name="unit"
            label="Unit"
            variant="outlined"
            fullWidth={true}
          />
        </Stack>
      </form>
      <List>
        {ingredients.map((item, index) => (
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "space-between", paddingLeft: 1 }}
            key={item.name}
          >
            <Stack direction="row" spacing={2}>
              <Typography component={"span"}>{item.name}</Typography>
              <Typography component={"span"}>
                {item.amount} {item.unit ?? ""}
              </Typography>
            </Stack>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={createRemoveHandler(index)}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        ))}
      </List>
    </>
  );
}
