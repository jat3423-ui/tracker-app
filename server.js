require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Serve static files (THIS FIXES YOUR ISSUE)
app.use(express.static(path.join(__dirname)));

// ✅ Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ Tracking route
app.post("/track", (req, res) => {
  const { latitude, longitude } = req.body;

  console.log("📍 Location received:");
  console.log("Latitude:", latitude);
  console.log("Longitude:", longitude);

  res.json({ message: "Location received" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port " + PORT);
});
