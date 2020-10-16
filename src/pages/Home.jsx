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
    <div>
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
              <span
                className="bg"
                style={{ backgroundImage: `url(${thumbnail})` }}
              ></span>
              <span className="info">
                <h2>{name}</h2>
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Home;
