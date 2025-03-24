const Habit = require("../models/Habit");

exports.createHabit = async (req, res) => {
  try {
    console.log("📩 Body reçu:", req.body);
    console.log("🔑 User ID (token):", req.user.userId);

    const { title, frequency } = req.body;

    if (!title || !frequency) {
      return res.status(400).json({ message: "Title and frequency are required." });
    }

    const newHabit = new Habit({
      userId: req.user.userId,
      title,
      frequency,
    });

    await newHabit.save();

    res.status(201).json(newHabit);
  } catch (error) {
    console.error("❌ Error creating habit:", error.message);
    res.status(500).json({ message: "Cannot create habit", error: error.message });
  }
};

exports.getHabits = async (req, res) => {
    try {
        console.log("✅ Authenticated user ID:", req.user.userId); // ← debug utile
    
        const habits = await Habit.find({ userId: req.user.userId });
        res.json(habits);
      } catch (err) {
        console.error("❌ Failed to get habits:", err.message);
        res.status(500).json({ message: "Server error", error: err.message });
      }
};
exports.updateHabit = async (req, res) => {
  try {
    const { title, frequency, doneToday } = req.body;

    const updatedHabit = await Habit.findByIdAndUpdate(
      req.params.id,
      { title, frequency, doneToday },
      { new: true }
    );

    if (!updatedHabit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    res.status(200).json(updatedHabit);
  } catch (error) {
    res.status(500).json({ message: "Error updating habit", error: error.message });
  }
};

exports.deleteHabit = async (req, res) => {
    try {
        const deletedHabit = await Habit.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!deletedHabit) return res.status(404).json({ error: "Habit not found" });
        res.json({ message: "Habit deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Delete failed" });
    }
};
