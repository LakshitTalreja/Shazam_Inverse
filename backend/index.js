const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// --- 1. Test route ---
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// --- 2. Start server ---
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
