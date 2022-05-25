import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import img from "../utils/defaultnews.jpg";

export default function ArticleCard({ article }) {
  return (
    <Card maxWidth="80%" sx={{ display: "flex", flexDirection: "row" }}>
      <CardMedia
        component="img"
        height="140"
        image={article.urlToImage || img}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" textAlign="left">
          {article.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="left">
          {article.description}
        </Typography>
        <Link
          href={article.url}
          underline="hover"
          target="_blank"
          rel="noopener"
          align="left"
        >
          Link to Article
        </Link>
      </CardContent>
    </Card>
  );
}
