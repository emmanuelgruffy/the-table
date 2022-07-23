const express = require("express");
const connectDB = require("./config/db");

// Initialize Express server
const app = express();

// Connect mongoDB
connectDB();

// Set Port to be whatever host will define or '5000' if run locally
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server start on port: ${PORT}`));
app.get("/", (req, res) => res.send("API running"));
