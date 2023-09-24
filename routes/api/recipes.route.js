const express = require("express");
const ctrl = require("../../controllers/recipes.controller");

const { isValidID, authenticate } = require("../../middlewares");
// const { schemas } = require("../../models/recipe.model");

const router = express.Router();

// router.get("/mainpage", authenticate, ctrl.mainPageDrinks);
// router.get("/popular", authenticate, ctrl.popularDrinks);
// router.get("/search", authenticate, ctrl.searchDrinks);
router.get("/:id", isValidID, authenticate, ctrl.getRecipeById);
// router.get("/own", authenticate, ctrl.getOwnDrinks);
// router.post(
//   "/own/add",
//   authenticate,
//   validateBody(schemas.addDrinkSchema),
//   ctrl.addOwnDrink
// );
// router.delete("/own/remove/:id", authenticate, isValidID, ctrl.removeOwnDrink);
// router.get("/favorite", authenticate, ctrl.getFavoritsDrinks);
// router.post(
//   "/favorite/add",
//   authenticate,
//   validateBody(schemas.addFavoritsDrink),
//   ctrl.addOwnDrink
// );
// router.delete(
//   "/favorite/remove/:id",
//   authenticate,
//   isValidID,
//   ctrl.removeFavoritsDrink
// );

module.exports = router;
