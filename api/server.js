const express = require("express");
const { logger, handleErrors } = require("./middleware/middleware");

const server = express();

const usersRouter = require("./users/users-router");

server.use(express.json());
server.use(logger);

server.use("/api/users", usersRouter);

server.get("*", (_req, res) => {
  res.json(`<h2>Hit the /api/users endpoint!</h2>`);
});

server.use(handleErrors);

module.exports = server;
