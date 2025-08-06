// app.js
const express = require("express");
const app = express();

const users = [
  { id: 1, email: "john@example.com" },
  { id: 2, email: "jane@example.com" },
];

app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

module.exports = app;
