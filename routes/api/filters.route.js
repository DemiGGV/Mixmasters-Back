const express = require("express");
const ctrl = require("../../controllers/recipes.controller");

const { authenticate } = require("../../middlewares");
// const { HttpError } = require("../../helpers");

const router = express.Router();

router.get("/categories", authenticate, ctrl.getCategories);
router.get("/ingredients", authenticate, ctrl.getIngredients);
router.get("/glasses", authenticate, ctrl.getGlasses);

// wrong method handler
// router.all(["/categories", "/ingredients", "/glasses"], (req, res, next) => {
//   next(HttpError(405));
// });

module.exports = router;
