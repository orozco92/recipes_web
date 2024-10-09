import RecipeListItem from "./RecipeListItem";
import { RecipeListDto } from "../../core/interfaces";

import "./RecipeList.css";
import RecipeListHeader from "./RecipeListHeader";
import { Skeleton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  data: RecipeListDto[];
  loading: boolean;
  totalPages: number;
  total: number;
}

function RecipeList({ data, loading, total, totalPages }: Props) {
  const navigate = useNavigate();
  return (
    <>
      <RecipeListHeader totalPages={totalPages} />
      <main className="recipe-container">
        {!loading &&
          data.map((item: RecipeListDto) => (
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
        {loading && (
          <>
            <Skeleton variant="rounded" width={345} height={400} />
            <Skeleton variant="rounded" width={345} height={400} />
            <Skeleton variant="rounded" width={345} height={400} />
          </>
        )}
      </main>
      {!loading && total === 0 && (
        <Typography variant="h4" textAlign="center">
          No recipes found
        </Typography>
      )}
    </>
  );
}

export default RecipeList;
