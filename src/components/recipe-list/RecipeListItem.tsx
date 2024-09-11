import {
  Card,
  CardMedia,
  Stack,
  CardContent,
  styled,
  Chip,
  Tooltip,
  Typography,
} from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import RestaurantIcon from "@mui/icons-material/Restaurant";

interface Props {
  title: string;
  author: string;
  img?: string;
  time?: number;
  calories?: number;
  servings?: number;
  mealType?: string;
  difficulty?: string;
}

const Item = styled("span")(({ theme }) => ({
  ...theme.typography.body2,
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
}));

function RecipeListItem({
  title,
  author,
  img,
  calories,
  servings,
  time,
  mealType,
  difficulty,
}: Props) {
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
        <Stack direction="row" spacing={1}>
          {mealType && <Chip label={mealType} size="small" />}
          {difficulty && <Chip label={difficulty} size="small" />}
        </Stack>
      </CardContent>
      {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions> */}
    </Card>
  );
}

export default RecipeListItem;
