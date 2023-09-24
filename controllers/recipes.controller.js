const { HttpError, ctrlWrap } = require("../helpers");
const { Recipe, CATEGORIES, GLASSES } = require("../models/recipe.model");
const { Ingredient } = require("../models/ingredient.model");

const SHAPE_RECIPE =
  "drink category alcoholic glass description instructions drinkThumb ingredients";
// Non alcoholic|Alcoholic
const getCategories = (req, res) => {
  res.json(CATEGORIES);
};

const getIngredients = async (req, res) => {
  console.log(req.user.isAdult);
  const condition = !req.user.isAdult ? "No" : /^(?:Yes\b|No\b)/;
  console.log(condition);
  const result = await Ingredient.distinct("title", {
    alcohol: condition,
  }).sort();
  if (!result) throw HttpError(404, "Not Found");
  res.json(result);
};

const getGlasses = (req, res) => {
  res.json(GLASSES);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  const result = await Recipe.findById(id, SHAPE_RECIPE).populate(
    "ingredients.ingredientId",
    "ingredientThumb"
  );
  if (!result) throw HttpError(404, "Not Found");
  res.json(result);
};

module.exports = {
  getCategories: ctrlWrap(getCategories),
  getIngredients: ctrlWrap(getIngredients),
  getGlasses: ctrlWrap(getGlasses),
  getRecipeById: ctrlWrap(getRecipeById),
  // getRecipeById: ctrlWrap(getRecipeById),
};

// const listContacts = async (req, res) => {
//   const { _id: owner } = req.user;
//   const { page = 1, limit = 10, favorite } = req.query;
//   const skip = (page - 1) * limit;
//   if (!favorite) {
//     const result = await Contact.find({ owner }, {}, { skip, limit });
//     res.json(result);
//     return;
//   }
//   const result = await Contact.find({ owner, favorite }, {}, { skip, limit });
//   res.json(result);
// };

// const removeContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await Contact.findByIdAndRemove(contactId);
//   if (!result) throw HttpError(404, "Not Found");
//   res.json({ message: "contact deleted" });
// };

// const addContact = async (req, res) => {
//   const { _id: owner } = req.user;
//   const result = await Contact.create({ ...req.body, owner });
//   if (!result) throw HttpError(404, "Not Found");
//   res.status(201).json(result);
// };

// const updateContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await Contact.findByIdAndUpdate(contactId, req.body, {
//     new: true,
//   });
//   if (!result) throw HttpError(404, "Not Found");
//   res.json(result);
// };

// const updateStatusContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await Contact.findByIdAndUpdate(contactId, req.body, {
//     new: true,
//   });
//   if (!result) throw HttpError(404, "Not Found");
//   res.json(result);
// };

// "_id":
// "drink":
// "category":
// "alcoholic":
// "glass":
// "description":
// "instructions":
// "drinkThumb":
// "ingredients": []

// коктейль
// const einendrink = [
//   {
//     _id: {},
//     drink: "",
//     category: "",
//     alcoholic: "",
//     glass: "",
//     description: "",
//     instructions: "",
//     drinkThumb: "",
//     ingredients: [
//       {
//         title: "Dark rum",
//         measure: "1 1/2 oz ",
//         ingredientId: {
//           $oid: "64aebb7f82d96cc69e0eb4a7",
//         },
//       },
//       {
//         title: "Kahlua",
//         measure: "1/2 oz ",
//         ingredientId: {
//           $oid: "64aebb7f82d96cc69e0eb4bd",
//         },
//       },
//       {
//         title: "Light cream",
//         measure: "1 oz ",
//         ingredientId: {
//           $oid: "64f1d5c069d8333cf130fb31",
//         },
//       },
//       {
//         title: "Nutmeg",
//         measure: "1/8 tsp grated ",
//         ingredientId: {
//           $oid: "64f1d5c069d8333cf130fb34",
//         },
//       },
//     ],
//   },
// ];
