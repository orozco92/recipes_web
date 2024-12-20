import {
  Button,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import { updateAccessToken } from "../../services/auth";

export function AppBarProfile() {
  const settings = ["My Recipes", "Favorites", "Profile", "Logout"] as const;
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const user = useAuthStore((s) => s.user);
  const setToken = useAuthStore((s) => s.setToken);
  const navigate = useNavigate();

  const welcomeMessageName = user?.firstName ?? user?.username;

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (value: (typeof settings)[number]) => {
    switch (value) {
      case "Favorites":
        navigate("/me/favorites");
        break;
      case "My Recipes":
        navigate("/me/recipes");
        break;
      case "Profile":
        navigate("/me");
        break;
      case "Logout":
        setToken(null);
        updateAccessToken();
        break;
    }
    setAnchorElUser(null);
  };

  return (
    <>
      {!user && (
        <Button component={Link} to={`/signin`} sx={{ my: 2, color: "white" }}>
          Sign In
        </Button>
      )}
      {user && (
        <>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={`picture of ${user.firstName}`} src={user.picture} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem disabled={true}>
              <Typography
                sx={{ textDecoration: "none", color: "inherit" }}
                variant="h6"
              >
                Welcome {welcomeMessageName}
              </Typography>
            </MenuItem>
            <Divider />
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => handleCloseUserMenu(setting)}
              >
                <Typography
                  textAlign="center"
                  sx={{ textDecoration: "none", color: "inherit" }}
                >
                  {setting}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </>
  );
}
