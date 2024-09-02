import {
  Card,
  CardHeader,
  IconButton,
  CardMedia,
  CardActions,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

interface Props {
  title: string;
  author: string;
  img: string;
}

function RecipeListItem({ title, author, img }: Props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        style={{ textAlign: "left" }}
        title={title}
        subheader={author}
      />
      <CardMedia
        component="img"
        // height="194"
        image={img || "/default-recipe-picture.jpeg"}
        alt={title}
      />
      {/* <CardContent>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
      </Typography>
    </CardContent> */}
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
