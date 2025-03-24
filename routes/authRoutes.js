const express = require("express");
const { signup, login ,logout,updateUser, deleteUser,getUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.get("/user", authMiddleware, getUser);
router.put("/update", authMiddleware, updateUser);
router.delete("/delete", authMiddleware, deleteUser);

module.exports = router;
