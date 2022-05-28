import {
  Box,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";

const Aggregator = () => {
  const [articles, setArticles] = useState([]);
  const categoriesArray = [
    "All News",
    "India",
    "Business",
    "Science",
    "Technology",
    "Entertainment",
    "Sports",
    "Health",
  ];
  const [category, setCategory] = useState("All News");
  const handleCategories = (event, newCategory) => {
    if (newCategory !== null) {
      setCategory(newCategory);
      setArticles([]);
    }
  };

  useEffect(() => {
    if (category === "All News") {
      axios
        .get(
          "https://newsapi.org/v2/top-headlines?language=en&apiKey=56ee1ebf0c3c46b69bf1ce765e34309c"
        )
        .then((res) => setArticles(res.data.articles));
    } else if (category === "India") {
      axios
        .get(
          "https://newsapi.org/v2/top-headlines?country=in&apiKey=56ee1ebf0c3c46b69bf1ce765e34309c"
        )
        .then((res) => setArticles(res.data.articles));
    } else {
      axios
        .get(
          `https://newsapi.org/v2/top-headlines?language=en&category=${category.toLowerCase()}&apiKey=56ee1ebf0c3c46b69bf1ce765e34309c`
        )
        .then((res) => setArticles(res.data.articles));
    }
  }, [category]);
  return (
    <>
      <Box
        className="CategoryBar"
        sx={{ display: "flex", justifyContent: "center", mt: 3 }}
      >
        <ToggleButtonGroup
          color="primary"
          exclusive
          value={category}
          onChange={handleCategories}
          aria-label="text formatting"
        >
          {categoriesArray.map((category) => (
            <ToggleButton
              key={categoriesArray.indexOf(category)}
              value={category}
              aria-label={category}
            >
              {category}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
      <Typography
        component="h1"
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "1%",
          fontSize: "1.5rem",
        }}
      >
        Top Headlines
      </Typography>
      <Box
        className="NewsArticles"
        sx={{
          flexGrow: 1,
          mt: "1%",
          mb: "2%",
          width: "90vw",
          ml: "5vw",
        }}
      >
        <Grid container spacing={2} align="center">
          {articles.map((article) => (
            <Grid item xs={6} key={articles.indexOf(article)}>
              <ArticleCard article={article} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Aggregator;
