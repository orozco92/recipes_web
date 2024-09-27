import { Typography } from "@mui/material";
import { RecipeStep } from "../../core/interfaces";

type Props = { steps: RecipeStep[] };

export function StepsDetail({ steps }: Props) {
  return (
    <>
      <Typography variant="h4" component={"h2"} pt={"1rem"} pb={"1rem"}>
        Steps
      </Typography>
      {steps.map((item) => (
        <p key={item.number}>{item.description}</p>
      ))}
    </>
  );
}
