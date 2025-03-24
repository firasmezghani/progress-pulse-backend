const express = require("express");
const {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
} = require("../controllers/habitController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Route POST utilisée par React pour créer une habitude
router.post("/", authMiddleware, createHabit);

// ✅ Route GET utilisée pour fetch les habitudes
router.get("/", authMiddleware, getHabits);

// ✅ Route DELETE /api/habits/:id
router.delete("/:id", authMiddleware, deleteHabit);

// ✅ Route PUT /api/habits/:id
router.put("/:id", authMiddleware, updateHabit);

// ⛔ Tu peux garder tes anciennes si tu veux
router.post("/create", authMiddleware, createHabit);
router.get("/user", authMiddleware, getHabits);
router.put("/update/:id", authMiddleware, updateHabit);
router.delete("/delete/:id", authMiddleware, deleteHabit);

module.exports = router;
