const express = require("express");
const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");
const Users = require("./users-model");

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
        next({ message: `Unable to update user with ID ${id} ` });
      } else {
        const newUser = await Users.getById(id);
        res.status(200).json(newUser);
      }
    })
    .catch(next);
});

router.delete("/:id", (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get("/:id/posts", (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post("/:id/posts", (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;
