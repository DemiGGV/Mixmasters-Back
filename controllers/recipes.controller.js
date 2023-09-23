const { HttpError, ctrlWrap } = require("../helpers");
const { Recipe } = require("../models/recipe.model");
// const { Ingridient } = require("../models/ingridient.model");

const getCategories = async (req, res) => {
  const result = await Recipe.distinct("category");
  if (!result) throw HttpError(404, "Not Found");
  res.json(result);
};

const getIngridients = async (req, res) => {
  const result = await Recipe.distinct("ingredients");
  if (!result) throw HttpError(404, "Not Found");
  res.json(result);
};

const getGlasses = async (req, res) => {
  const result = await Recipe.distinct("glass");
  if (!result) throw HttpError(404, "Not Found");
  res.json(result);
};

const getRecipeById = async (req, res) => {
  const { recipeId } = req.params;
  const result = await Recipe.findById(recipeId);
  if (!result) throw HttpError(404, "Not Found");
  res.json(result);
};

module.exports = {
  getCategories: ctrlWrap(getCategories),
  getIngridients: ctrlWrap(getIngridients),
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
