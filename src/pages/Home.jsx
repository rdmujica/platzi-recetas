import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getLatest } from "../mealdb-api";

const Home = () => {
  const [recipes, setRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const recipesValue = await getLatest();
        setRecipes(recipesValue);
      } catch (e) {
        setRecipes(null);
      }
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) return <div className="message">Cargando...</div>;

  return (
    <>
      <Helmet>
        <title>Recetas</title>
        <meta
          name="description"
          content="Recetas con ingredientes preparacion"
        />
      </Helmet>

      <div className="recipes">
        {recipes &&
          recipes.map(({ id, name, thumbnail }) => (
            <Link to={`/recipe/${id}`} className="recipe" key={id}>
              <img
                className="bg"
                crossOrigin="anonymous"
                src={`${thumbnail}`}
                alt="images"
              />
              <span className="info">
                <h2>{name}</h2>
              </span>
            </Link>
          ))}
      </div>
    </>
  );
};

export default Home;
