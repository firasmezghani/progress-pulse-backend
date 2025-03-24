const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");



dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/habits", require("./routes/habitRoutes"));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
