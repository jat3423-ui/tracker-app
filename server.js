const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve HTML
app.use(express.static(__dirname));

// ✅ MongoDB Connection (REPLACE THIS URL)
mongoose.connect(mongodb+srv://divyanshchoudhary876_db_user:l2Mwf8DIjAk1y03G@cluster0.zammc3k.mongodb.net/?appName=Cluster0)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// ✅ Schema
const Location = mongoose.model("Location", {
  latitude: String,
  longitude: String,
  time: { type: Date, default: Date.now }
});

// ✅ Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ Tracking route
app.post("/track", async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    console.log("📍 Location received:");
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);

    const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
    console.log("🌍 Google Maps:", mapLink);

    // ✅ Save to MongoDB
    await Location.create({ latitude, longitude });

    res.json({ message: "Saved in DB ✅" });

  } catch (error) {
    console.log("❌ Error:", error);
    res.status(500).json({ error: "Failed to save" });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port " + PORT);
});
