import {
  IconButton,
  List,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

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

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export function Ingredients() {
  const [items, setItems] = useState<Ingredient[]>([]);

  const handleAddIngredient = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const ingredient = Object.fromEntries(
      formData.entries()
    ) as unknown as Ingredient;

    form.reset();
    setItems([...items, ingredient]);
  };

  const createRemoveHandler = (index: number) => () => {
    const newIngredients = [
      ...items.slice(0, index),
      ...items.slice(index + 1),
    ];
    setItems(newIngredients);
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
        {items.map((item, index) => (
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
