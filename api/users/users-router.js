const express = require("express");
const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");
const Users = require("./users-model");
const Posts = require("../posts/posts-model");

const router = express.Router();

router.use("/:id", validateUserId);

router.get("/", (_req, res, next) => {
  Users.get()
    .then((users) => res.status(200).json(users))
    .catch(next);
});

router.get("/:id", (req, res) => res.status(200).json(req.user));

router.post("/", validateUser, (req, res, next) => {
  Users.insert(req.body)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch(next);
});

router.put("/:id", validateUser, (req, res, next) => {
  const id = req.user.id;
  Users.update(id, req.body)
    .then(async (result) => {
      if (!result) {
        next({ message: `Unable to update user with ID ${id}` });
      } else {
        const newUser = await Users.getById(id);
        res.status(200).json(newUser);
      }
    })
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  const user = req.user;
  Users.remove(user.id)
    .then(async (result) => {
      if (!result) {
        next({ message: `Unable to delete user with ID ${user.id}` });
      } else {
        res.status(200).json({ ...user, status: "deleted" });
      }
    })
    .catch(next);
});

router.get("/:id/posts", (req, res, next) => {
  const id = req.user.id;
  Users.getUserPosts(id)
    .then((posts) => {
      posts.length === 0
        ? res
            .status(404)
            .json({ message: `User with the ID ${id} has no posts` })
        : res.status(200).json(posts);
    })
    .catch(next);
});

router.post("/:id/posts", validatePost, (req, res, next) => {
  Posts.insert(req.body)
    .then((result) => res.status(200).json(result))
    .catch(next);
});

module.exports = router;
