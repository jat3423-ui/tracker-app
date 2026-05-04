const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ FIXED static path
app.use(express.static(__dirname));

// ✅ Home route
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
