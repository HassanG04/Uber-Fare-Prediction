const { MongoClient } = require("mongodb");

let client;
let db;

async function connectDB() {
  if (db) return db;

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB;

  if (!uri) throw new Error("Missing MONGODB_URI in .env");
  if (!dbName) throw new Error("Missing MONGODB_DB in .env");

  client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  await client.connect();
  db = client.db(dbName);
  return db;
}

function getDB() {
  if (!db) throw new Error("DB not connected yet. Call connectDB() first.");
  return db;
}

module.exports = { connectDB, getDB };
