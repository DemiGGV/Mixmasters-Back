const express = require("express");
const ctrl = require("../../controllers/auth.controller");

const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/categories", authenticate, ctrl.verifyAuth);
router.get("/ingridients", authenticate, ctrl.verifyAuth);
router.get("/glasses", authenticate, ctrl.getCurrent);

module.exports = router;
