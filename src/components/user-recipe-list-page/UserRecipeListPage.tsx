import { Avatar, Stack, Tooltip, Typography } from "@mui/material";
import {
  GridColDef,
  GridActionsCellItem,
  DataGrid,
  GridRenderCellParams,
  gridClasses,
} from "@mui/x-data-grid";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useNotifications, useDialogs } from "@toolpad/core";
import { myRecipes, removeRecipe } from "../../services/recipe";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { Recipe } from "../../core/interfaces";
import { defaultPageSizes, defaultRecipePicture } from "../../core/constants";
import { capitalize } from "../../core/utils/utils.ts";
import { useBasicTableActions } from "../../hooks/useBasicTableActions.ts";
import { QuickSearchToolbar } from "../utils/QuickTableSearchToolbar.tsx";

export function UserRecipeListPage() {
  const { page, pageSize, handlePaginationChange, search, handleFilterChange } =
    useBasicTableActions();
  const notifications = useNotifications();
  const navigate = useNavigate();
  const dialogs = useDialogs();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["myRecipes", page, pageSize, search],
    queryFn: () =>
      myRecipes({
        search,
        page: page + 1,
        pageSize,
      }),
    placeholderData: keepPreviousData,
  });
  const editRecipeHandler = (id: number) => () =>
    navigate(`/recipes/${id}/edit`);

  const deleteRecipeHandler = (id: number) => () => {
    dialogs
      .confirm("This opperation cannot be undone. Are you sure?", {
        okText: "Yes",
        cancelText: "No",
      })
      .then(
        (data) => {
          if (data) {
            return removeRecipe(id);
          }
        },
        (error) => console.log("dialog error", error)
      )
      .then((data) => {
        if (data) {
          notifications.show("Recipe deleted", { severity: "success" });
          refetch();
        }
      })
      .catch(() => {
        notifications.show("Error deleting the recipe", { severity: "error" });
      });
  };

  const columns: GridColDef[] = [
    {
      field: "picture",
      headerName: "Picture",
      flex: 0.5,
      type: "custom",
      renderCell: renderPicture,
    },
    { field: "name", headerName: "Title", flex: 1 },
    {
      field: "cookingTime",
      headerName: "Cooking time",
      type: "number",
      flex: 1,
    },
    {
      field: "servings",
      headerName: "Servings",
      type: "number",
      flex: 1,
    },
    {
      field: "calories",
      headerName: "Calories",
      type: "number",
      flex: 1,
    },
    {
      field: "mealType",
      headerName: "Meal type",
      type: "string",
      flex: 1,
      valueGetter: (value, row) => capitalize(row.mealType),
    },
    {
      field: "difficulty",
      headerName: "Difficulty",
      type: "string",
      flex: 1,
      valueGetter: (value, row) => capitalize(row.difficulty),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      cellClassName: "actions",
      flex: 0.8,
      getActions: ({ row }) => {
        return [
          <Tooltip title={"Edit recipe"}>
            <GridActionsCellItem
              icon={<EditIcon />}
              label={"Edit"}
              className="textPrimary"
              onClick={editRecipeHandler(row.id)}
              color="inherit"
            />
          </Tooltip>,

          <Tooltip title={"Delete recipe"}>
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={deleteRecipeHandler(row.id)}
              color="inherit"
            />
          </Tooltip>,
        ];
      },
    },
  ];

  return (
    <Stack sx={{ height: "100%" }}>
      <Typography component={"h1"} variant="h4">
        My recipes
      </Typography>

      <DataGrid
        columns={columns}
        rowCount={data?.total ?? 0}
        initialState={{ pagination: { paginationModel: { page, pageSize } } }}
        pageSizeOptions={defaultPageSizes}
        rows={data?.data ?? []}
        loading={isLoading}
        sx={{
          border: 0,
          flexGrow: 1,
          [`& .${gridClasses.cell}`]: {
            py: 1,
          },
        }}
        paginationMode="server"
        onPaginationModelChange={handlePaginationChange}
        sortingMode="server"
        filterMode="server"
        onFilterModelChange={handleFilterChange}
        getRowHeight={() => "auto"}
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        slots={{
          toolbar: QuickSearchToolbar,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </Stack>
  );
}

function renderPicture(params: GridRenderCellParams<Recipe, any, any>) {
  return (
    <Avatar
      alt={`picture of ${params.row.name}`}
      src={params.value ?? defaultRecipePicture}
      sx={{ width: 56, height: 56 }}
    />
  );
}
