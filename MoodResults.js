// src/pages/MoodResults.js

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../style/MoodResults.css";

const MoodResults = () => {
  const { cuisine } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCuisineRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`
      );
      setRecipes(response.data.meals || []);
    } catch (err) {
      setError("Failed to fetch recipes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCuisineRecipes();
  }, [cuisine]);

  return (
    <div className="mood-results-container">
      <h1>Recipes from {cuisine} Cuisine</h1>

      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <span className="loader"></span>
      ) : (
        <div className="movie-list">
          {recipes.map((recipe) => (
            <div key={recipe.idMeal} className="movie-card">
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <div className="movie-details">
                <h2>{recipe.strMeal}</h2>
                <Link
                  to={`/recipeDetails/${recipe.idMeal}`}
                  className="favorite-button"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoodResults;
