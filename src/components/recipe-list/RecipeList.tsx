import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { listRecipes } from "../../services/recipe";
import RecipeListItem from "./RecipeListItem";
import { RecipeListDto } from "../../core/interfaces";

import "./RecipeList.css";
import RecipeListHeader from "./RecipeListHeader";
import { useRecipeListStore } from "../../store/recipe-list-filter";
import { Skeleton, Typography } from "@mui/material";

function RecipeList() {
  // Queries
  const page = useRecipeListStore((s) => s.page);
  const mealType = useRecipeListStore((s) => s.mealType);
  const difficulty = useRecipeListStore((s) => s.difficulty);

  const { data, isLoading } = useQuery({
    queryKey: ["listRecipes", page, mealType, difficulty],
    queryFn: () =>
      listRecipes({
        page,
        pageSize: 10,
        mealType: mealType,
        difficulty,
      }),
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <RecipeListHeader totalPages={data?.totalPages} />
      <main className="recipe-container">
        {!isLoading &&
          data?.data.map((item: RecipeListDto) => (
            <RecipeListItem
              key={item.id}
              title={item.name}
              author={"David"}
              img={item.picture}
              calories={item.calories}
              servings={item.servings}
              time={item.cookingTime}
              mealType={item.mealType}
              difficulty={item.difficulty}
            />
          ))}
        {isLoading && (
          <>
            <Skeleton variant="rounded" width={345} height={400} />
            <Skeleton variant="rounded" width={345} height={400} />
            <Skeleton variant="rounded" width={345} height={400} />
          </>
        )}
      </main>
      {!isLoading && (!data || data.total === 0) && (
        <Typography variant="h4" textAlign="center">
          No recipes found
        </Typography>
      )}
    </>
  );
}

export default RecipeList;
