const express = require("express");
const ctrl = require("../../controllers/recipes.controller");

const {
  isValidID,
  authenticate,
  validateQuery,
  upload,
} = require("../../middlewares");
// const { HttpError } = require("../../helpers");
const { schemas } = require("../../models/recipe.model");
const getDrinks = require("../../temp/drinks");
const getIngredients = require("../../temp/ingrids");

const router = express.Router();

router.get("/updateRecipes", authenticate, getDrinks);
router.get("/updateIngredients", authenticate, getIngredients);
router.get(
  "/mainpage",
  authenticate,
  validateQuery(schemas.countRecipesSchema),
  ctrl.mainPageRecipes
);
router.get("/popular", authenticate, ctrl.popularRecipes);
router.get(
  "/search",
  authenticate,
  validateQuery(schemas.searchRecipeSchema),
  ctrl.searchRecipes
);
router.get("/favorite", authenticate, ctrl.getFavoritsRecipes);
router.post(
  "/favorite/add",
  authenticate,
  validateQuery(schemas.addDeleteIdSchema),
  ctrl.addFavoriteRecipe
);
router.delete(
  "/favorite/remove",
  authenticate,
  validateQuery(schemas.addDeleteIdSchema),
  ctrl.removeFavoritRecipe
);
router.get("/own", authenticate, ctrl.getOwnRecipes);
router.post(
  "/own/add",
  authenticate,
  upload.single("cocktail"),
  ctrl.addOwnRecipe
);
router.delete("/own/remove", authenticate, ctrl.removeOwnRecipe);
router.get("/:id", authenticate, isValidID, ctrl.getRecipeById);

// router.all(
//   [
//     "/:id",
//     "/mainpage",
//     "/popular",
//     "/search",
//     "/own",
//     "/own/add",
//     "/own/remove/:id",
//     "/favorite",
//     "/favorite/add",
//     "/favorite/remove/",
//   ],
//   (req, res, next) => {
//     next(HttpError(405));
//   }
// );

module.exports = router;
