const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB, getDB } = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/health", async (req, res) => {
  try {
    const db = getDB();
    await db.command({ ping: 1 });
    res.json({ ok: true, db: "connected" });
  } catch (err) {
    res.status(500).json({ ok: false, db: "not_connected", error: err.message });
  }
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
