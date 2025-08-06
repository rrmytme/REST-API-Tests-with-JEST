// app.js
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(bodyParser.json());

const SECRET = "mysecret";
let items = [];
let idCounter = 1;

// Auth middleware
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).send("Unauthorized");
  }
}

// Login route
app.post("/login", (req, res) => {
  const { username } = req.body;
  const token = jwt.sign({ username }, SECRET);
  res.json({ token });
});

// CRUD routes
app.post("/items", authenticate, (req, res) => {
  const item = { id: idCounter++, ...req.body };
  items.push(item);
  res.status(201).json(item);
});

app.get("/items/:id", authenticate, (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  item ? res.json(item) : res.sendStatus(404);
});

app.put("/items/:id", authenticate, (req, res) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (index === -1) return res.sendStatus(404);
  items[index] = { ...items[index], ...req.body };
  res.json(items[index]);
});

app.delete("/items/:id", authenticate, (req, res) => {
  items = items.filter((i) => i.id !== parseInt(req.params.id));
  res.sendStatus(204);
});

module.exports = app;
