const express = require("express");
const ctrl = require("../../controllers/recipes.controller");

const { isValidID, authenticate } = require("../../middlewares");
const { HttpError } = require("../../helpers");
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

router.all(
  [
    "/:id",
    "/mainpage",
    "/popular",
    "/search",
    "/own",
    "/own/add",
    "/own/remove/:id",
    "/favorite",
    "/favorite/add",
    "/favorite/remove/:id",
  ],
  (req, res, next) => {
    next(HttpError(405));
  }
);

module.exports = router;
