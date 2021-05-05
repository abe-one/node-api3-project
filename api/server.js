const express = require("express");
const {
  logger,
  validateUserId,
  handleErrors,
} = require("./middleware/middleware");

const server = express();
const usersRouter = require("./users/users-router");

server.use(express.json());
server.use(logger);
server.use("/api/users/:id", validateUserId);

server.use("/api/users", usersRouter);

server.get("/", (_req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use(handleErrors);

module.exports = server;
