const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbPath = "burgerclickerDB.db";
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(
      "Erreur lors de la connexion à la base de données :",
      err.message,
    );
  } else {
    console.log("Connecté à la base de données SQLite");
  }
});

app.get("/leaderboard", (req, res) => {
  const sql =
    "SELECT name, score FROM leaderboard ORDER BY score DESC LIMIT 10";
  res.setHeader("Access-Control-Allow-Origin", "*");
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(
        "Erreur lors de la récupération du leaderboard :",
        err.message,
      );
      res
        .status(500)
        .json({ erreur: "Erreur lors de la récupération du leaderboard" });
    } else {
      res.json(rows);
    }
  });
});
app.get("/test", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send("test");
});

app.listen(port, () => {
  console.log(`Serveur API en cours d'exécution sur le port ${port}`);
});
