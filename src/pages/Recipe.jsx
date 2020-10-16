import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { getRecipe } from "../mealdb-api";
import { RecipeIngredients, RecipeInstructions } from "../components";

const Recipe = (props) => {
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const recipeValue = await getRecipe(props.match.params.recipeId);
        setRecipe(recipeValue);
      } catch (e) {
        setRecipe(null);
      }
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <div className="message">Cargando...</div>;

  if (recipe === null) return <div className="message">Hubo un problema </div>;

  return (
    <div className="Recipe">
      <Helmet>
        <title>{recipe.name}</title>
        <meta
          name="description"
          content={`Recetas con ingredientes preparacion ${recipe.name} ${recipe.origin}`}
        />
      </Helmet>

      <div
        className="hero"
        style={{ backgroundImage: `url(${recipe.thumbnail})` }}
      />

      <div className="title">
        <div className="info">
          <h1>{recipe.name}</h1>
          <p>{recipe.origin}</p>
        </div>
        <div></div>
      </div>

      <RecipeIngredients ingredients={recipe.ingredients} />

      <RecipeInstructions instructions={recipe.instructions} />
    </div>
  );
};

export default Recipe;
