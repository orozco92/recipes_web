import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  disableUser,
  enableUser,
  listUsers,
  removeUser,
} from "../../services/user";
import { useUserListStore } from "../../store/user-list";
import {
  DataGrid,
  GridActionsCellItem,
  gridClasses,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Chip, Stack, Tooltip, Typography } from "@mui/material";
import { Colors, User } from "../../core/interfaces";
import { Roles } from "../../core/enums";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
// import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonIcon from "@mui/icons-material/Person";
import { useDialogs, useNotifications } from "@toolpad/core";
import { defaultPageSizes } from "../../core/constants";
import { useBasicTableActions } from "../../hooks/useBasicTableActions";

export function UserListPage() {
  const { page, pageSize, handlePaginationChange } = useBasicTableActions();
  const roles = useUserListStore((s) => s.roles);
  const notifications = useNotifications();
  const dialogs = useDialogs();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["listUsers", page, pageSize, roles],
    queryFn: () =>
      listUsers({
        page,
        pageSize,
        roles,
      }),
    placeholderData: keepPreviousData,
  });

  const toogleUserEnable = (user: User) => () => {
    if (user.enabled)
      disableUser(user.id)
        .then((data) => {
          if (data.status === "SUCCESS")
            notifications.show("User disabled", {
              severity: "success",
              autoHideDuration: 3000,
            });
          else
            notifications.show("The user is already disabled", {
              severity: "info",
              autoHideDuration: 3000,
            });
        })
        .catch(() => {
          notifications.show("Error disabling user", {
            severity: "error",
            autoHideDuration: 3000,
          });
        })
        .finally(() => refetch());
    else
      enableUser(user.id)
        .then((data) => {
          if (data.status === "SUCCESS")
            notifications.show("User enabled", {
              severity: "success",
              autoHideDuration: 3000,
            });
          else
            notifications.show("The user is already enabled", {
              severity: "info",
              autoHideDuration: 3000,
            });
        })
        .catch(() => {
          notifications.show("Error enabling user", {
            severity: "error",
            autoHideDuration: 3000,
          });
        })
        .finally(() => refetch());
  };

  const deleteUserHandler = (user: User) => () => {
    dialogs
      .confirm("This opperation cannot be undone. Are you sure?", {
        okText: "Yes",
        cancelText: "No",
      })
      .then(
        (data) => {
          if (data) {
            return removeUser(user.id);
          }
        },
        (error) => console.log("dialog error", error)
      )
      .then((data) => {
        if (data) {
          notifications.show("User deleted", { severity: "success" });
          refetch();
        }
      })
      .catch(() => {
        notifications.show("Error deleting the user", { severity: "error" });
      });
  };

  const columns: GridColDef[] = [
    { field: "email", headerName: "Email", flex: 1 },
    { field: "username", headerName: "Username", flex: 1 },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 1,
      valueGetter: (_value, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
    },
    {
      field: "role",
      headerName: "Role",
      type: "custom",
      flex: 0.5,
      renderCell: renderRole,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      cellClassName: "actions",
      flex: 0.8,
      getActions: ({ row }) => {
        return [
          <Tooltip title={"Disable user"}>
            <GridActionsCellItem
              icon={row.enabled ? <PersonOffIcon /> : <PersonIcon />}
              label={row.enabled ? "Disable" : "Enable"}
              className="textPrimary"
              onClick={toogleUserEnable(row)}
              color="inherit"
            />
          </Tooltip>,
          // <Tooltip title={"Reset password"}>
          //   <GridActionsCellItem
          //     icon={<VpnKeyIcon />}
          //     label="Reset password"
          //     className="textPrimary"
          //     onClick={(event) => {
          //       event.preventDefault();
          //       event.stopPropagation();
          //     }}
          //     color="inherit"
          //   />
          // </Tooltip>,
          <Tooltip title={"Delete user"}>
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={deleteUserHandler(row)}
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
        User List
      </Typography>
      <DataGrid
        rows={data?.data ?? []}
        columns={columns}
        initialState={{ pagination: { paginationModel: { page, pageSize } } }}
        pageSizeOptions={defaultPageSizes}
        disableRowSelectionOnClick
        sx={{
          border: 0,
          flexGrow: 1,
          [`& .${gridClasses.cell}`]: {
            py: 1,
          },
        }}
        loading={isLoading}
        paginationMode="server"
        onPaginationModelChange={handlePaginationChange}
        sortingMode="server"
        filterMode="server"
        getRowHeight={() => "auto"}
        rowCount={data?.total ?? 0}
      />
    </Stack>
  );
}

function renderRole(params: GridRenderCellParams<User, any, any>) {
  if (params.value == null) {
    return "";
  }

  function getColorByRole(role: Roles): Colors {
    if (Roles.Admin === role) return "error";
    if (Roles.Colaborator === role) return "success";
    if (Roles.Community === role) return "info";
    return "default";
  }
  return (
    <Chip
      label={params.formattedValue}
      color={getColorByRole(params.formattedValue)}
    />
  );
}
