const { HttpError, ctrlWrap } = require("../helpers");
const { Recipe, CATEGORIES, GLASSES } = require("../models/recipe.model");
const { Ingredient } = require("../models/ingredient.model");

const SHAPE_RECIPE =
  "drink category alcoholic glass description instructions drinkThumb ingredients";

const getCategories = async (req, res) => {
  // const result = await Recipe.distinct("category").sort();
  res.json(CATEGORIES);
};

const getIngredients = async (req, res) => {
  console.log("isAdult", req.user.isAdult);
  const condition = !req.user.isAdult ? "No" : /^(?:Yes\b|No\b)/;
  const result = await Ingredient.find(
    {
      alcohol: condition,
    },
    { title: 1 }
  ).sort();
  if (!result) throw HttpError(404, "Not Found");
  res.json(result);
};

const getGlasses = async (req, res) => {
  // const result = await Recipe.distinct("glass").sort();
  res.json(GLASSES);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const result = await Recipe.findById(id, SHAPE_RECIPE).populate(
    "ingredients.ingredientId",
    "ingredientThumb"
  );
  if (!result) throw HttpError(404, "Not Found");
  console.log(`${result.category}`);
  res.json(result);
};

module.exports = {
  getCategories: ctrlWrap(getCategories),
  getIngredients: ctrlWrap(getIngredients),
  getGlasses: ctrlWrap(getGlasses),
  getRecipeById: ctrlWrap(getRecipeById),
  // getRecipeById: ctrlWrap(getRecipeById),
};
