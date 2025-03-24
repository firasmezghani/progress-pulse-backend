const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Signup failed!" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });
                  res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Login failed!" });
    }
};
exports.logout = async (req, res) => {
    res.status(200).json({ message: "User logged out successfully!" });
};
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password"); // Exclude password
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
exports.updateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let updatedData = {};

        if (name) updatedData.name = name;
        if (email) updatedData.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedData.password = hashedPassword;
        }

        const user = await User.findByIdAndUpdate(req.user.userId, updatedData, { new: true }).select("-password");
        res.json({ message: "User updated successfully!", user });
    } catch (error) {
        res.status(500).json({ error: "Update failed" });
    }
};
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.userId);
        res.json({ message: "User deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Delete failed" });
    }
};
