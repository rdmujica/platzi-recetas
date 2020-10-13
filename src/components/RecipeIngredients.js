import React from "react";

const RecipeIngredients = ({ ingredients }) => (
  <div className="ingredients">
    <h2>Ingredients</h2>
    <ul>
      {ingredients.map(({ ingredient, measure }, ix) => (
        <li key={ix}>
          {ingredient}: {measure}
        </li>
      ))}
    </ul>
  </div>
);

export default RecipeIngredients;
