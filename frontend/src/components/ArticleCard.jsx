import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import img from "../utils/defaultnews.jpg";
import { stripHtml } from "../utils/utils";

export default function ArticleCard({ article }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "240px",
      }}
    >
      <CardMedia
        component="img"
        image={article.urlToImage || img}
        sx={{ width: "200px", height: "200px", objectFit: "cover", ml: 2 }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" textAlign="left">
          {article.title.split("-")[0]}
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="left">
          {article.description &&
            (article.description.length > 170
              ? stripHtml(article.description.substring(0, 165)) + "..."
              : stripHtml(article.description))}
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
