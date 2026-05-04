const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Home route (optional)
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// ✅ Serve tracking page (MAIN STEP)
app.get("/track", (req, res) => {
  res.sendFile(path.join(__dirname, "track.html"));
});

// ✅ Receive location
app.post("/location", (req, res) => {
  const { lat, lng } = req.body;

  console.log("📍 Location received:", lat, lng);
  console.log("🌍 https://maps.google.com/?q=" + lat + "," + lng);

  res.send("OK");
});

// ✅ Start server
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});