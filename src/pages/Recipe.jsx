import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { getRecipe } from "../mealdb-api";
import { RecipeIngredients, RecipeInstructions } from "../components";

const Recipe = (props) => {
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const compartir = (e) => {
    e.preventDefault();

    // if (navigator.canShare) {
    //   navigator
    //     .share({
    //       title: `${recipe.name}`,
    //       text: "Receta de Platzi",
    //       url: document.location.href
    //     })
    //     .then(() => alert("Share was successful."))
    //     .catch((error) => alert("Sharing failed", error));
    // } else {
    //   alert(`Your system doesn't support sharing files.`);
    // }

    console.log(document.location.href);
    if (!navigator.share) {
      alert("Tu browser no soporta la Web Share");
      return;
    }
    navigator
      .share({
        title: `${recipe.name}`,
        text: "Receta de Platzi",
        url: document.location.href
      })
      .then(() => alert("Contenido Compartido"))
      .catch((error) => alert("Hubo un error", error.message));
  };

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

      <section className="hero">
        <img crossOrigin="anonymous" src={`${recipe.thumbnail}`} alt="images" />
      </section>

      <div className="title">
        <div className="info">
          <h1>{recipe.name}</h1>
          <p>{recipe.origin}</p>
        </div>
        <div>
          <a href onClick={compartir}>
            Compartir
          </a>
        </div>
      </div>

      <RecipeIngredients ingredients={recipe.ingredients} />

      <RecipeInstructions instructions={recipe.instructions} />
    </div>
  );
};

export default Recipe;
