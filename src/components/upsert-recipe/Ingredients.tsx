import {
  IconButton,
  List,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useUpsertRecipeStore } from "../../store/recipe";
import { Ingredient } from "../../core/interfaces";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const TextItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  backgroundImage: "none",
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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
        <Stack direction="row" justifyContent="space-between" p={1}>
          <Typography variant="h5">Ingredients</Typography>
          <IconButton edge="end" aria-label="add-ingredient" type="submit">
            <AddIcon />
          </IconButton>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Item style={{ flexGrow: 1 }}>
            <TextField
              id="name"
              name="name"
              label="Title"
              variant="outlined"
              fullWidth={true}
            />
          </Item>
          <Item>
            <TextField
              id="amount"
              name="amount"
              label="Amount"
              variant="outlined"
              fullWidth={true}
            />
          </Item>
          <Item>
            <TextField
              id="unit"
              name="unit"
              label="Unit"
              variant="outlined"
              fullWidth={true}
            />
          </Item>
        </Stack>
      </form>
      <List>
        {ingredients.map((item, index) => (
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={2}
            key={item.name}
          >
            <Stack direction="row" spacing={2}>
              <TextItem>{item.name}</TextItem>
              <TextItem>
                {item.amount} ({item.unit})
              </TextItem>
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
