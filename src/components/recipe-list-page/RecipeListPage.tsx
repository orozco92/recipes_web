import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { MealType } from "../../core/interfaces";
import { listRecipes } from "../../services/recipe";
import { globalSearch } from "../../store/global-search";
import { useRecipeListStore } from "../../store/recipe-list";
import RecipeList from "../recipe-list/RecipeList";

export function RecipeListPage() {
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

  return (
    <RecipeList
      data={data?.data}
      loading={isLoading}
      total={data?.total ?? 0}
      totalPages={data?.totalPages ?? 0}
    />
  );
}
