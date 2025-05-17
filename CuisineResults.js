// src/pages/CuisineResults.js

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CuisineResults = () => {
  const { cuisine } = useParams();
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchByCuisine = async () => {
      try {
        const res = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`
        );
        setRecipes(res.data.meals || []);
      } catch (error) {
        console.error("Error fetching cuisine:", error);
      }
    };

    fetchByCuisine();
  }, [cuisine]);

  return (
    <div className="search-results-container">
      <h2>Recipes from {cuisine} cuisine</h2>
      <div className="search-results-grid">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              className="movie-card"
              onClick={() =>
                navigate(`/recipeDetails/${recipe.idMeal}`, {
                  state: { recipe },
                })
              }
            >
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <div className="p-4">
                <h2>{recipe.strMeal}</h2>
              </div>
            </div>
          ))
        ) : (
          <p>No recipes found for this cuisine.</p>
        )}
      </div>
    </div>
  );
};

export default CuisineResults;
