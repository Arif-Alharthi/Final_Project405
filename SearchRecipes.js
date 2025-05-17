import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const SearchRecipes = ({
  recipes,
  searchTerm,
  setRecipes,
  favorites,
  setFavorites,
}) => {
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setRecipes(location.state.recipes || []);
    }
  }, [location.state, setRecipes]);

  const handleFavorite = (recipe) => {
    if (favorites.some((fav) => fav.idMeal === recipe.idMeal)) {
      setFavorites(favorites.filter((fav) => fav.idMeal !== recipe.idMeal));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  return (
    <div className="search-results-container">
      <h2>Search results for "{searchTerm}"</h2>

      <div className="search-results-grid">
        {recipes.map((recipe) => (
          <div key={recipe.idMeal} className="movie-card">
            <Link
              to={`/recipeDetails/${recipe.idMeal}`}
              state={{ recipe }}
            >
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <div className="p-4">
                <h2>{recipe.strMeal}</h2>
                <p>{recipe.strCategory}</p>
              </div>
            </Link>
            <button
              className="favorite-button"
              onClick={() => handleFavorite(recipe)}
            >
              {favorites.some((fav) => fav.idMeal === recipe.idMeal)
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchRecipes;
