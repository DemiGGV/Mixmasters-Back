const express = require("express");
const ctrl = require("../../controllers/users.controller");

const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user.model");

const router = express.Router();

router.get("/current", authenticate, ctrl.getCurrent);
router.patch(
  "/update",
  authenticate,
  upload.single("avatar"),
  validateBody(schemas.verifyNameSchema),
  ctrl.updateUser
);
router.post(
  "/subscribe",
  authenticate,
  validateBody(schemas.verifyEmailSchema),
  ctrl.subscribeEmail
);
router.get("/unsubscribe/:id", ctrl.unsubscribeEmail);

module.exports = router;
