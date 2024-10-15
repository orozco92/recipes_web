import { useState } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Divider,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/DiningSharp";
import MenuIcon from "@mui/icons-material/Menu";
import AppBarSearch from "./AppBarSearch";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { AppBarProfile } from "./AppBarProfile";
import { useAuthStore } from "../../store/auth";
import { Roles } from "../../core/enums";

const pages = ["Breakfast", "Lunch", "Dinner", "Deserts"];

function ResponsiveAppBar() {
  const title = "Recipes App";
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const { type: mealTypeParam } = useParams();
  const { pathname } = useLocation();
  const user = useAuthStore((s) => s.user);

  const canCreateRecipe =
    user && [Roles.Admin, Roles.Colaborator].includes(user.role);
  const canManageUsers = user && Roles.Admin === user.role;

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {title}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              {canCreateRecipe && [
                <Divider key={"canCreateRecipeDivider"} />,
                <MenuItem
                  onClick={handleCloseNavMenu}
                  key={"canCreateRecipeItem"}
                >
                  <Typography
                    textAlign="center"
                    component={Link}
                    to="/recipes/new"
                    sx={{ textDecoration: "none", color: "inherit" }}
                  >
                    New recipe
                  </Typography>
                </MenuItem>,
              ]}
              {canManageUsers && [
                <Divider key={"canManageUsersDivider"} />,
                <MenuItem
                  onClick={handleCloseNavMenu}
                  key={"canManageUsersItem"}
                >
                  <Typography
                    textAlign="center"
                    component={Link}
                    to="/users"
                    sx={{ textDecoration: "none", color: "inherit" }}
                  >
                    Users
                  </Typography>
                </MenuItem>,
              ]}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={NavLink}
                to={`recipes/${page.toLowerCase()}`}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
                variant={
                  mealTypeParam === page.toLowerCase() ? "contained" : "text"
                }
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {canCreateRecipe && (
              <Button
                component={NavLink}
                to={`recipes/new`}
                sx={{ my: 2, color: "white" }}
                variant={pathname === "/recipes/new" ? "contained" : "text"}
              >
                New recipe
              </Button>
            )}
            {canManageUsers && (
              <Button
                component={NavLink}
                to={`/users`}
                sx={{ my: 2, color: "white" }}
                variant={pathname.startsWith("/users") ? "contained" : "text"}
              >
                Users
              </Button>
            )}
          </Box>
          <Box>
            <AppBarSearch />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <AppBarProfile />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
