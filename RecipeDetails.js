// src/pages/RecipeDetails.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/MovieDetails.css';  // أو المسار الصحيح لملف CSS الخاص بالتفاصيل

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  // جلب تفاصيل الوصفة عبر الـ lookup endpoint
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        if (res.data.meals && res.data.meals.length > 0) {
          setRecipe(res.data.meals[0]);
        } else {
          setRecipe(null);
        }
      } catch (err) {
        console.error('Error fetching recipe details:', err);
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  // عرض لودر أثناء التحميل
  if (loading) {
    return <span className="loader"></span>;
  }

  // إذا لم توجد الوصفة
  if (!recipe) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Recipe not found.</p>;
  }

  // قائمة المكوّنات مع القياسات
  const renderIngredients = () => {
    const items = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        items.push(
          <li key={i}>
            {measure} {ingredient}
          </li>
        );
      }
    }
    return items;
  };

  return (
    <div className="movie-details-container">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <div className="movie-details-content">
        <h1>{recipe.strMeal}</h1>
        <p><strong>Category:</strong> {recipe.strCategory || 'N/A'}</p>
        <p><strong>Area:</strong> {recipe.strArea || 'N/A'}</p>
        <p><strong>Instructions:</strong></p>
        <p>{recipe.strInstructions || 'No instructions available.'}</p>

        {recipe.strYoutube && (
          <a
            href={recipe.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="favorite-button"
            style={{ display: 'inline-block', margin: '1rem 0' }}
          >
            ▶️ Watch on YouTube
          </a>
        )}

        <h3>📝 Ingredients:</h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px' }}>
          {renderIngredients()}
        </ul>

        <button
          className="favorite-button"
          onClick={() => navigate(-1)}
          style={{ marginTop: '1rem' }}
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default RecipeDetails;

