const express = require("express");
const ctrl = require("../../controllers/users.controller");

const { validateQuery, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user.model");
// const { HttpError } = require("../../helpers");

const router = express.Router();

router.get("/current", authenticate, ctrl.getCurrent);
router.patch(
  "/update",
  authenticate,
  upload.single("avatar"),
  validateQuery(schemas.verifyNameSchema),
  ctrl.updateUser
);
router.post(
  "/subscribe",
  authenticate,
  validateQuery(schemas.verifyEmailSchema),
  ctrl.subscribeEmail
);
router.get("/unsubscribe/:id", ctrl.unsubscribeEmail);

// router.all(["/current", "/update", "/subscribe"], (req, res, next) => {
//   next(HttpError(405));
// });

module.exports = router;
