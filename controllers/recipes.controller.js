const { HttpError, ctrlWrap } = require("../helpers");
const {
  Recipe,
  CATEGORIES,
  GLASSES,
  schemas,
} = require("../models/recipe.model");
const { Ingredient } = require("../models/ingredient.model");

const SHAPE_RECIPE =
  "drink category alcoholic glass description instructions drinkThumb ingredients favorite own";

const getCategories = async (req, res) => {
  // const result = await Recipe.distinct("category").sort();
  res.json(CATEGORIES);
};

const getIngredients = async (req, res) => {
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
  res.json(result);
};

const mainPageRecipes = async (req, res) => {
  const condition = !req.user.isAdult
    ? "Non alcoholic"
    : /^(?:Alcoholic\b|Non alcoholic\b)/;

  const { count } = req.query;
  const result = await Recipe.aggregate()
    .match({ alcoholic: condition })
    .addFields({
      favoritesLength: {
        $size: {
          $ifNull: ["$favorite", []],
        },
      },
    })
    .sort({
      category: 1,
      drink: 1,
    })
    .group({
      _id: "$category",
      category: { $first: "$category" },
      favoritesLength: { $first: "$favoritesLength" },
      docs: { $push: "$$ROOT" },
    })
    .project({
      _id: 0,
      category: 1,
      favoritesLength: 1,
      docs: {
        $slice: ["$docs", +count],
      },
    })
    .unwind("$docs")
    .replaceRoot("$docs")
    .project({
      drink: 1,
      category: 1,
      alcoholic: 1,
      glass: 1,
      description: 1,
      instructions: 1,
      drinkThumb: 1,
      ingredients: 1,
      favorite: 1,
      owner: 1,
      favoritesLength: 1,
    })
    .exec();

  if (!result) throw HttpError(404, "Not Found");
  res.json(result);
};

const popularRecipes = async (req, res) => {
  const condition = !req.user.isAdult
    ? "Non alcoholic"
    : /^(?:Alcoholic\b|Non alcoholic\b)/;

  const result = await Recipe.aggregate()
    .match({ alcoholic: condition, favorite: { $exists: true } })
    .addFields({
      favoritesLength: {
        $size: "$favorite",
      },
    })
    .project({
      drink: 1,
      category: 1,
      alcoholic: 1,
      glass: 1,
      description: 1,
      instructions: 1,
      drinkThumb: 1,
      ingredients: 1,
      favorite: 1,
      owner: 1,
      favoritesLength: 1,
    })
    .sort({
      favoritesLength: -1,
      drink: 1,
    })
    .exec();

  if (!result) throw HttpError(404, "Not Found");
  res.json(result);
};

const searchRecipes = async (req, res) => {
  const {
    q: keyWord = null,
    page = 0,
    limit = 0,
    category = null,
    ingredient = null,
  } = req.query;
  const condition = !req.user.isAdult
    ? "Non alcoholic"
    : /^(?:Alcoholic\b|Non alcoholic\b)/;

  const filterObj = {};
  if (category) filterObj.category = category.trim();
  if (ingredient) filterObj.ingredient = ingredient.trim();
  const skip = (page - 1) * limit;

  const result = await Recipe.aggregate()
    .match(
      {
        alcoholic: condition,
        drink: {
          $regex: keyWord,
          $options: "i",
        },
      },
      filterObj
    )
    .sort({
      drink: 1,
    })
    .skip(+skip)
    .limit(+limit)
    .project({
      drink: 1,
      category: 1,
      alcoholic: 1,
      glass: 1,
      description: 1,
      instructions: 1,
      drinkThumb: 1,
      ingredients: 1,
      favorite: 1,
      owner: 1,
    })
    .exec();

  if (!result) throw HttpError(404, "Not Found");
  res.json(result);
};

const getFavoritsRecipes = async (req, res) => {
  const { _id } = req.user;
  const result = await Recipe.find({ favorite: _id }, SHAPE_RECIPE).sort({
    drink: 1,
  });
  if (!result) throw HttpError(404, "Not Found");
  res.json(result);
};

const getOwnRecipes = async (req, res) => {
  const { _id } = req.user;
  const result = await Recipe.find({ owner: _id }, SHAPE_RECIPE).sort({
    drink: 1,
  });
  if (!result) throw HttpError(404, "Not Found");
  res.json(result);
};

const addFavoriteRecipe = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.body;
  const result = await Recipe.findByIdAndUpdate(
    id,
    { $addToSet: { favorite: _id } },
    { new: true },
    SHAPE_RECIPE
  );
  if (!result) throw HttpError(404, "Not Found");
  res.json(result);
};

const removeFavoritRecipe = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.body;
  let result = await Recipe.findByIdAndUpdate(
    id,
    {
      $pull: { favorite: _id },
    },
    { new: true }
  ).select(SHAPE_RECIPE);

  // remove empty field
  if (result.favorite.length === 0) {
    result = await Recipe.findByIdAndUpdate(
      id,
      { $unset: { favorite: 1 } },
      { new: true }
    ).select(SHAPE_RECIPE);
  }
  if (!result) throw HttpError(404, "Not Found");
  res.json(result);
};

const removeOwnRecipe = async (req, res) => {
  const { id: recipeId } = req.body;
  const result = await Recipe.findByIdAndRemove(recipeId);
  if (!result) throw HttpError(404, "Not Found");
  res.status(204).json();
};

const addOwnRecipe = async (req, res) => {
  const { _id: userId } = req.user;
  const recipeReq = JSON.parse(req.body.recipe);
  const drinkThumb = async (req, res) => req.file.path;
  const recipeDB = { ...recipeReq, drinkThumb, owner: userId };
  const { error } = schemas.addRecipeSchema.validate(recipeDB);
  if (error) throw HttpError(400, error.message);

  const result = await Recipe.create(recipeDB);
  if (!result) throw HttpError(404, "Not Found");

  res.status(201).json(result);
};

module.exports = {
  getCategories: ctrlWrap(getCategories),
  getIngredients: ctrlWrap(getIngredients),
  getGlasses: ctrlWrap(getGlasses),
  getRecipeById: ctrlWrap(getRecipeById),
  popularRecipes: ctrlWrap(popularRecipes),
  mainPageRecipes: ctrlWrap(mainPageRecipes),
  searchRecipes: ctrlWrap(searchRecipes),
  getFavoritsRecipes: ctrlWrap(getFavoritsRecipes),
  getOwnRecipes: ctrlWrap(getOwnRecipes),
  addFavoriteRecipe: ctrlWrap(addFavoriteRecipe),
  removeFavoritRecipe: ctrlWrap(removeFavoritRecipe),
  removeOwnRecipe: ctrlWrap(removeOwnRecipe),
  addOwnRecipe: ctrlWrap(addOwnRecipe),
};
