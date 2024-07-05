const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(cors({ origin: true }));

app.use(bodyParser.json());

const db = new sqlite3.Database("callbacks.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS callbacks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reference TEXT,
    data TEXT,
    received_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`;

db.run(createTableQuery, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Callback table created (if it did not exist).");
  }
});

app.get("/", (req, res) => {
  res.send("The API is working!");
});

app.post("/api/payment", (req, res) => {
  const formData = req.body;

  const reference = formData.reference;
  const transactionId = formData.transaction_id;
  const amount = formData.amount;
  const status = formData.status;

  const callbackData = {
    reference,
    transactionId,
    amount,
    status,
  };

  db.run(
    "INSERT INTO callbacks (reference, data) VALUES (?, ?)",
    [callbackData.reference, JSON.stringify(callbackData)],
    (err) => {
      if (err) {
        console.error("Error storing callback data:", err.message);
      } else {
        console.log("Callback data stored successfully.");
      }
    }
  );

  res.status(200).json({ message: "Payment notification received" });
});

app.get("/api/callbacks", (req, res) => {
  const sql = "SELECT * FROM callbacks";

  db.all(sql, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ message: "Error fetching callbacks" });
    } else {
      res.json(rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
