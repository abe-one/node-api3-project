const express = require("express");

const { validatePost } = require("../middleware/middleware");

const Posts = require("./posts-model");

const router = express.Router();

module.exports = router;
