const express = require("express");
const ctrl = require("../../controllers/auth.controller");

const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user.model");

const router = express.Router();

router.post("/register", validateBody(schemas.signupSchema), ctrl.signup);
router.post("/login", validateBody(schemas.signinSchema), ctrl.signin);
router.post("/logout", authenticate, ctrl.signout);

module.exports = router;
