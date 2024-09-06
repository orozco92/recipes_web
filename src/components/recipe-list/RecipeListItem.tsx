import {
  Card,
  CardHeader,
  IconButton,
  CardMedia,
  CardActions,
  Stack,
  CardContent,
  styled,
  Chip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
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
      <CardHeader
        style={{ textAlign: "left" }}
        title={title}
        subheader={author}
      />
      <CardMedia
        component="img"
        height="194"
        image={img || "/default-recipe-picture.jpeg"}
        alt={title}
      />
      <CardContent>
        {/* <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography> */}
        <Stack
          direction="row"
          spacing={2}
          // marginTop={"1rem"}
          marginBottom={"1rem"}
        >
          <Item>
            {time} <AccessTimeFilledIcon />
          </Item>
          <Item>
            {servings} <RestaurantIcon />
          </Item>
          <Item>
            {calories} <WhatshotIcon />
          </Item>
        </Stack>
        {/* <Item>
          {author} <PersonIcon /> 
        </Item> */}
        <Stack direction="row" spacing={1}>
          {mealType && <Chip label={mealType} size="small" />}
          {difficulty && <Chip label={difficulty} size="small" />}
        </Stack>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default RecipeListItem;
