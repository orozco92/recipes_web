import { Typography } from "@mui/material";
import { Ingredient } from "../../core/interfaces";
import Grid from "@mui/material/Grid2";

type Props = { ingredients: Ingredient[] };

export function IngredientsDetail({ ingredients }: Props) {
  return (
    <>
      <Typography variant="h4" component={"h2"} pt={"1rem"} pb={"1rem"}>
        Ingredients
      </Typography>
      <Grid
        container
        spacing={{ sm: 2, md: 5 }}
        rowSpacing={1}
        columns={{ xs: 1, sm: 2, md: 3 }}
      >
        {ingredients.map((item) => (
          <Grid
            key={item.name}
            size={1}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" component={"span"}>
              {item.name}
            </Typography>
            <span>
              {item.amount} {item.unit}
            </span>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
