const express = require("express");

const app = express();

app.get("/health", (req, res) => {
  //memory usage
  res.json({ ok: true, ...process.memoryUsage() });
});

module.exports = app;
