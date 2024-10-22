import {
  Card,
  CardMedia,
  Stack,
  CardContent,
  styled,
  Chip,
  Tooltip,
  Typography,
  IconButton,
  CardActions,
} from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AddToFavoriteIcon from "@mui/icons-material/FavoriteBorder";
import RemoveFromFavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import { useFavoritesStore } from "../../store/favorites";
import { useAuthStore } from "../../store/auth";
import { addToFavorites, removeFromFavorites } from "../../services/profile";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useDialogs } from "@toolpad/core";
import { useNavigate } from "react-router-dom";

interface Props {
  id: number;
  title: string;
  author: string;
  img?: string;
  time?: number;
  calories?: number;
  servings?: number;
  mealType?: string;
  difficulty?: string;
  onClick?: () => void;
}

const Item = styled("span")(({ theme }) => ({
  ...theme.typography.body2,
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
}));

function RecipeListItem({
  id,
  title,
  img,
  calories,
  servings,
  time,
  mealType,
  difficulty,
  onClick,
}: Props) {
  const notifications = useNotifications();
  const dialogs = useDialogs();
  const user = useAuthStore((s) => s.user);
  const favorites = useFavoritesStore((s) => s.favorites);
  const addToFavoritesStore = useFavoritesStore((s) => s.addToFavorites);
  const removeFromFavoritesStore = useFavoritesStore(
    (s) => s.removeFromFavorites
  );
  const navigate = useNavigate();
  const isFavorite = favorites.includes(id);

  const handleFavoriteButtonClick = () => {
    if (isFavorite) {
      notifications.show("Removed from favorites", {
        severity: "success",
        autoHideDuration: 3000,
      });
      removeFromFavoritesStore(id);
      removeFromFavorites(id).then((data) => {
        if (!data) addToFavoritesStore(id);
      });
    } else {
      notifications.show("Added to favorites", {
        severity: "success",
        autoHideDuration: 3000,
      });
      addToFavoritesStore(id);
      addToFavorites(id).then((data) => {
        if (!data) removeFromFavoritesStore(id);
      });
    }
  };

  const handleShareButtonClick = () => {
    import("../utils/SocialShareDialog").then(({ SocialShareDialog }) =>
      dialogs.open(SocialShareDialog, id)
    );
  };
  const handleEditClick = () => navigate(`/recipes/${id}/edit`);
  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* <CardHeader
        style={{ textAlign: "left" }}
        title={title}
        subheader={author}
      /> */}
      <CardMedia
        component="img"
        height="194"
        image={img || "/default-recipe-picture.jpeg"}
        alt={title}
        onClick={onClick}
        sx={{ cursor: "pointer" }}
      />
      <CardContent>
        <Stack direction="row" spacing={2} marginBottom={"0.5rem"}>
          <Tooltip title="Cooking time" placement="top">
            <Item>
              {time ?? "-"} <AccessTimeFilledIcon />
            </Item>
          </Tooltip>
          <Tooltip title="Servings" placement="top">
            <Item>
              {servings ?? "-"} <RestaurantIcon />
            </Item>
          </Tooltip>
          <Tooltip title="Calories" placement="top">
            <Item>
              {calories ?? "-"} <WhatshotIcon />
            </Item>
          </Tooltip>
        </Stack>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        {/* <Item>
          {author} <PersonIcon /> 
        </Item> */}
        <Stack direction="row" spacing={1} marginBottom={"0.5rem"}>
          {mealType && <Chip label={mealType} size="small" />}
          {difficulty && <Chip label={difficulty} size="small" />}
        </Stack>
        {/* <Stack direction="row" spacing={2}>
          <Tooltip title="Add to favorites" placement="top">
            <Item>
              <FavoriteIcon />
            </Item>
          </Tooltip>
          <Tooltip title="Share" placement="top">
            <Item>
              <ShareIcon />
            </Item>
          </Tooltip>
        </Stack> */}
      </CardContent>
      <CardActions disableSpacing>
        {user && (
          <Tooltip
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            placement="top"
          >
            <IconButton
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
              onClick={handleFavoriteButtonClick}
            >
              {isFavorite ? <RemoveFromFavoriteIcon /> : <AddToFavoriteIcon />}
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title={"Share"} placement="top">
          <IconButton aria-label="share" onClick={handleShareButtonClick}>
            <ShareIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Edit recipe"} placement="top">
          <IconButton aria-label="edit" onClick={handleEditClick}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

export default RecipeListItem;
