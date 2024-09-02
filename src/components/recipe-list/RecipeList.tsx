import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { listRecipes } from "../../services/recipe";
import RecipeListItem from "./RecipeListItem";
import { RecipeListDto } from "../../core/interfaces";

import "./RecipeList.css";
import { ChangeEvent, useState } from "react";
import { Pagination } from "@mui/material";

function RecipeList() {
  // Queries
  const [page, setPage] = useState(1);
  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["listRecipes", page],
      queryFn: () => listRecipes(page, 1),
      placeholderData: keepPreviousData,
    });

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) =>
    setPage(value);
  return (
    <>
      <header>
        <Pagination
          count={data?.totalPages ?? 1}
          page={page}
          onChange={handlePageChange}
        />
      </header>
      <main className="recipe-container">
        {data?.data.map((item: RecipeListDto) => (
          <RecipeListItem
            key={item.id}
            title={item.name}
            author={"David"}
            img={item.picture}
          />
        ))}
      </main>
    </>
  );
}

export default RecipeList;
