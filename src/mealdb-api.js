import "isomorphic-fetch";

const baseUrl = "https://www.themealdb.com/api/json/v1/1";

export const getLatest = async () => {
  const request = await fetch(`${baseUrl}/search.php?f=c`);
  const data = await request.json();
  const recipes = data.meals.map((m) => normalizeMeal(m));
  return recipes;
};

export const getRecipe = async (recipeId) => {
  const request = await fetch(`${baseUrl}/lookup.php?i=${recipeId}`);
  const data = await request.json();
  if (!data.meals) return null;
  const recipe = normalizeMeal(data.meals.shift());
  return recipe;
};

const normalizeMeal = (meal) => {
  const { strInstructions, strTags, ...rest } = meal;
  const instructions = strInstructions.split("\n").filter((i) => i.trim());
  const tags = strTags ? strTags.split(",") : [];
  const ingredients = [];
  for (let i = 1; i < 21; i++) {
    if (meal[`strIngredient${i}`] && meal[`strMeasure${i}`]) {
      ingredients.push({
        ingredient: meal[`strIngredient${i}`],
        measure: meal[`strMeasure${i}`]
      });
    }
  }
  return {
    id: rest.idMeal,
    name: rest.strMeal,
    category: rest.strCategory,
    origin: rest.strArea,
    thumbnail: rest.strMealThumb,
    youtube: rest.strYoutube,
    url: rest.strSource,
    dateModified: rest.dateModified,
    instructions,
    tags,
    ingredients
  };
};
