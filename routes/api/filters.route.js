const express = require("express");
const ctrl = require("../../controllers/recipes.controller");

const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/categories", authenticate, ctrl.verifyAuth);
router.get("/ingridients", authenticate, ctrl.verifyAuth);
router.get("/glasses", authenticate, ctrl.getCurrent);

module.exports = router;

// const ingridient = {
//   _id: {
//     $oid: "64aebb7f82d96cc69e0eb4a4",
//   },
//   title: "Light rum",
//   ingredientThumb:
//     "https://res.cloudinary.com/dec1shvoo/image/upload/v1689169605/cocktails-v1/ingredient/Light20rum.png",
//   "thumb-medium":
//     "https://res.cloudinary.com/dec1shvoo/image/upload/v1689169605/cocktails-v1/ingredient/Light20rum-Medium.png",
//   "thumb-small":
//     "https://res.cloudinary.com/dec1shvoo/image/upload/v1689169605/cocktails-v1/ingredient/Light20rum-Small.png",
//   abv: "40",
//   alcohol: "Yes",
//   description:
//     'Light rums, also referred to as "silver" or "white" rums, in general, have very little flavour aside from a general sweetness. Light rums are sometimes filtered after aging to remove any colour. The majority of light rums come from Puerto Rico. Their milder flavours make them popular for use in mixed drinks, as opposed to drinking them straight. Light rums are included in some of the most popular cocktails including the Mojito and the Daiquiri.',
//   type: "Rum",
//   flavour: "light, sweet",
//   country: "Puerto Rico",
// };

// const tm = ingridient["thumb-medium"];
