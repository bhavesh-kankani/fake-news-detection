import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import img from "../utils/defaultnews.jpg";

export default function ArticleCard({ article }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "30vh",
        overflow: "scroll",
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={article.urlToImage || img}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" textAlign="left">
          {article.title.split("-")[0]}
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="left">
          {article.description &&
            (article.description.length > 170
              ? article.description.substring(0, 165) + "..."
              : article.description)}
          <Link
            href={article.url}
            underline="hover"
            target="_blank"
            rel="noopener"
            align="left"
            sx={{ ml: "1.5%" }}
          >
            Read More
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
}
