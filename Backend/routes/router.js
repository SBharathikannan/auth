const express = require("express");
const { signup } = require("../controller/signup");
const { login, refreshToken } = require("../controller/login");
const { getUserById } = require("../controller/authenticate");
const { authenticateToken } = require("../Utils/authMiddleware");
const router = express.Router();

router.post("/register", signup);
router.post("/login", login);
router.get("/user", authenticateToken, getUserById);
router.post("/refresh-Token", refreshToken);

module.exports = router;
