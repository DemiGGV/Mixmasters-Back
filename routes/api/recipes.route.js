const express = require("express");
const controller = require("../../controllers/recipes.controller");

const { validateBody, isValidID, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/recipe.model");

const router = express.Router();

router.get("/mainpage", authenticate, controller.mainPageDrinks);
router.get("/popular", authenticate, controller.popularDrinks);
router.get("/search", authenticate, controller.searchDrinks);
router.get("/:id", isValidID, authenticate, controller.getIdDrink);
router.get("/own", authenticate, controller.getOwnDrinks);
router.post(
  "/own/add",
  authenticate,
  validateBody(schemas.addDrinkSchema),
  controller.addOwnDrink
);
router.delete(
  "/own/remove/:id",
  authenticate,
  isValidID,
  controller.removeOwnDrink
);
router.get("/favorite", authenticate, controller.getFavoritsDrinks);
router.post(
  "/favorite/add",
  authenticate,
  validateBody(schemas.addFavoritsDrink),
  controller.addOwnDrink
);
router.delete(
  "/favorite/remove/:id",
  authenticate,
  isValidID,
  controller.removeFavoritsDrink
);

module.exports = router;
