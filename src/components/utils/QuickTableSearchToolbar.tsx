import { Stack } from "@mui/material";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";

export function QuickSearchToolbar() {
  return (
    <Stack direction={"row-reverse"}>
      <GridToolbarQuickFilter />
    </Stack>
  );
}
