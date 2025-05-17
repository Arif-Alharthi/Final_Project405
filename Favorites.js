import React from "react";
import "../style/Favorites.css";

const Favorites = ({ favorites }) => {
  return (
    <div className="favorites-container">
      <h2>Your Favorite Recipes</h2>
      <div className="favorites-grid">
        {favorites.length > 0 ? (
          favorites.map((recipe) => (
            <div key={recipe.idMeal} className="favorite-movies-card">
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <h2>{recipe.strMeal}</h2>
              <p>{recipe.strArea} Cuisine</p>
            </div>
          ))
        ) : (
          <p>No favorite recipes yet. Start adding some!</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
