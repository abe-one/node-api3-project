const express = require("express");
const { logger, validateUserId } = require("./middleware/middleware");

const server = express();

server.use(express.json());
server.use(logger);
server.use("/:id", validateUserId);

server.get("/:id", (req, res) => {
  res.send(`<h2>Testing ${req.params.id}</h2>`);
});

server.get("/", (_req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
