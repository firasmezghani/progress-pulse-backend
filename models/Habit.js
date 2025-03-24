const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  frequency: { type: String, required: true }, // Daily, Weekly, etc.
  streak: { type: Number, default: 0 },
  doneToday: { type: Boolean, default: false }, // ✅ AJOUTÉ
}, { timestamps: true });

module.exports = mongoose.model("Habit", HabitSchema);
