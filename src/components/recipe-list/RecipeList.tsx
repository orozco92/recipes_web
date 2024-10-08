import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { listRecipes } from "../../services/recipe";
import RecipeListItem from "./RecipeListItem";
import { MealType, RecipeListDto } from "../../core/interfaces";

import "./RecipeList.css";
import RecipeListHeader from "./RecipeListHeader";
import { useRecipeListStore } from "../../store/recipe-list-filter";
import { Skeleton, Typography } from "@mui/material";
import { globalSearch } from "../../store/global-search";
import { useNavigate, useParams } from "react-router-dom";

function RecipeList() {
  // Queries
  const page = useRecipeListStore((s) => s.page);
  const pageSize = useRecipeListStore((s) => s.pageSize);
  const mealType = useRecipeListStore((s) => s.mealType);
  const difficulty = useRecipeListStore((s) => s.difficulty);

  const search = globalSearch((state) => state.search);
  const { type: mealTypeParam } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: [
      "listRecipes",
      search,
      page,
      pageSize,
      mealType,
      difficulty,
      mealTypeParam,
    ],
    queryFn: () =>
      listRecipes({
        search,
        page,
        pageSize,
        mealType: (mealTypeParam
          ? mealTypeParam.toUpperCase()
          : mealType) as MealType,
        difficulty,
      }),
    placeholderData: keepPreviousData,
  });

  const navigate = useNavigate();

  return (
    <>
      <RecipeListHeader totalPages={data?.totalPages} />
      <main className="recipe-container">
        {!isLoading &&
          data?.data.map((item: RecipeListDto) => (
            <RecipeListItem
              key={item.id}
              id={item.id}
              title={item.name}
              author={"David"}
              img={item.picture}
              calories={item.calories}
              servings={item.servings}
              time={item.cookingTime}
              mealType={item.mealType}
              difficulty={item.difficulty}
              onClick={() => navigate(`/recipes/${item.id}/show`)}
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
