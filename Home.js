import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import backgroundImg from "../assets/food-background.jpg";
import "../style/HomePage.css";

const Home = ({
  setSearchTerm,
  setRecipes,
  setCurrentPage,
  setTotalResults,
}) => {
  const [input, setInput] = useState("");
  const [moodVisible, setMoodVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset to page 1 on new search
    setCurrentPage(1);
    setSearchTerm(input);

    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
      );
      if (response.data.meals) {
        setRecipes(response.data.meals);
        setTotalResults(response.data.meals.length);
        navigate("/searchResults", {
          state: {
            recipes: response.data.meals,
            searchTerm: input,
          },
        });
      } else {
        alert("No recipes found. Try another keyword.");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      alert("Failed to fetch recipes. Please try again.");
    }
  };

  const handleRandomRecipe = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      if (response.data.meals?.length) {
        const randomRecipe = response.data.meals[0];
        navigate(`/recipeDetails/${randomRecipe.idMeal}`, {
          state: { recipe: randomRecipe },
        });
      }
    } catch (error) {
      console.error("Error fetching random recipe:", error);
      alert("Failed to fetch a random recipe.");
    }
  };

  const handleMoodSelection = () => {
    setMoodVisible((prev) => !prev);
  };

  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <h1>Discover Delicious Recipes from Around the World</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for a recipe..."
        />
        <button type="submit">Search</button>
      </form>

      <div>
        <button
          onClick={handleRandomRecipe}
          className="random-movie-button"
        >
          Random Recipe
        </button>
        <button
          onClick={handleMoodSelection}
          className="mood-selection-button"
        >
          Select Cuisine
        </button>
        <Link to="/recipeBot" className="movie-man-button">
          <button className="movie-man-btn">Ask RecipeBot</button>
        </Link>
      </div>

      {moodVisible && (
        <div className="mood-buttons">
          {[
            "American", "British", "Canadian", "Chinese",
            "Dutch", "Egyptian", "French", "Greek",
            "Indian", "Irish", "Italian", "Jamaican", "Japanese"
          ].map((cuisine) => (
            <button
              key={cuisine}
              onClick={() => navigate(`/cuisine/${cuisine}`)}
              className="mood-button"
            >
              {cuisine}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
