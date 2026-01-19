const express = require("express");
const sqlite = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const path = require("path");   

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const db = new sqlite.Database("./expense.db");
db.run(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    value REAL NOT NULL
  )
`);

function getTotal(cb) {
  db.get(`SELECT IFNULL(SUM(value),0) AS total FROM expenses`, [], (err, row) => {
    if (err) return cb(err);
    cb(null, row.total);
  });
}

app.get("/", (req, res) => {
  db.all("SELECT id, name, value FROM expenses ORDER by id", [], (err, rows) => {
    if (err) return res.status(500).send('DB error');
    getTotal((e, total) => {
      if (e) return res.status(500).send("DB error");
      res.render("index", { expenses: rows, total });
    });
  });
});

app.post("/add", (req, res) => {
  const name = (req.body.name || "").trim();
  const value = Number(req.body.value);
  if (!name || isNaN(value)) return res.status(400).send("Bad input");
  db.run(`INSERT INTO expenses (name, value) VALUES (?, ?)`, [name, value], function (err) {
    if (err) return res.status(500).send("DB error");
    res.redirect("/"); 
  });
});

app.post("/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const name = (req.body.name || "").trim();
  const value = Number(req.body.value);
  if (!id || !name || isNaN(value)) return res.status(400).json({ ok: false });
  db.run(`UPDATE expenses SET name = ?, value = ? WHERE id = ?`, [name, value, id], (err) => {
    if (err) return res.status(500).json({ ok: false });
    getTotal((e, total) => {
      if (e) return res.status(500).json({ ok: false });
      res.json({ ok: true, total });
    });
  });
});

app.post("/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ ok: false });
  db.run(`DELETE FROM expenses WHERE id = ?`, [id], (err) => {
    if (err) return res.status(500).json({ ok: false });
    getTotal((e, total) => {
      if (e) return res.status(500).json({ ok: false });
      res.json({ ok: true, total });
    });
  });
});

app.listen(3000, () => console.log("Open http://localhost:3000"));
