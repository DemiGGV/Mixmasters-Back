const express = require("express");
const ctrl = require("../../controllers/users.controller");

const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user.model");

const router = express.Router();

router.get("/current", authenticate, ctrl.getCurrent);
router.patch("/update", authenticate, upload.single("avatar"), ctrl.updateUser);
router.post(
  "/subscribe",
  authenticate,
  validateBody(schemas.verifyEmailSchema),
  ctrl.subscribeEmail
);

module.exports = router;
