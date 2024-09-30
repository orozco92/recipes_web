import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { RecipeDetailLoading, RecipeDetails } from "./RecipeDetails";
import { Button } from "@mui/material";

export function ShowRecipe() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["getRecipeData", recipeId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/recipes/${recipeId}`);
      const json = response.json();
      return json;
    },
  });

  const goBack = () => navigate(-1);

  const {
    name,
    picture,
    cookingTime,
    servings,
    mealType,
    difficulty,
    calories,
    steps,
    ingredients,
  } = data ?? {};

  return (
    <>
      {isLoading && <RecipeDetailLoading />}
      {!isLoading && (
        <>
          {" "}
          <RecipeDetails
            name={name}
            picture={picture}
            cookingTime={cookingTime}
            servings={servings}
            mealType={mealType}
            difficulty={difficulty}
            calories={calories}
            steps={steps}
            ingredients={ingredients}
          />
          <Button type="button" onClick={goBack}>
            Go back
          </Button>
        </>
      )}
    </>
  );
}
