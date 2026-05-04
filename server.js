const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve HTML
app.use(express.static(__dirname));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://divyanshchoudhary876_db_user:l2Mwf8DIjAk1y03G@cluster0.zammc3k.mongodb.net/trackerDB?retryWrites=true&w=majority")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// Schema
const Location = mongoose.model("Location", {
  latitude: String,
  longitude: String,
  time: { type: Date, default: Date.now }
});

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Tracking route
app.post("/track", async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    if (!latitude || !longitude) {
      return res.status(400).json({ error: "Missing location data" });
    }
    console.log("📍 Location received:");
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);
    const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
    console.log("🌍 Google Maps:", mapLink);
    await Location.create({ latitude, longitude });
    res.json({ message: "Saved in DB ✅" });
  } catch (error) {
    console.log("❌ Error:", error);
    res.status(500).json({ error: "Failed to save" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Server running on port " + PORT);
});
