import { GridPaginationModel, GridFilterModel } from "@mui/x-data-grid";
import { useState } from "react";
import { firstPage, defaultTablePageSize } from "../core/constants";

export function useBasicTableActions() {
  const [page, setPage] = useState(firstPage);
  const [pageSize, setPageSize] = useState(defaultTablePageSize);
  const [search, setSearch] = useState("");

  const handlePaginationChange = (model: GridPaginationModel) => {
    if (page !== model.page) setPage(model.page);
    if (pageSize !== model.pageSize) setPageSize(model.pageSize);
  };
  const handleSortChange = (model: GridFilterModel) => {};

  const handleFilterChange = (model: GridFilterModel) => {
    const value = model.quickFilterValues?.join(" ") ?? "";
    if (value != search) setSearch(value);
  };

  return { page, pageSize, handlePaginationChange, search, handleFilterChange };
}
