const Posts = require("../posts/posts-model");
const { userSchema } = require("./schemas");

function logger(req, _res, next) {
  console.log(`{
  request-method: ${req.method},
  endpoint: ${req.originalUrl},
  time-received: ${new Date().toISOString()},
  `);
  next();
}

function validateUserId(req, res, next) {
  const id = req.params.id;
  Posts.getById(id)
    .then((post) => {
      if (!post) {
        next({ status: 404, message: `Post with ID ${id} does not exist` });
      } else {
        req.post = post;
        next();
      }
    })
    .catch((err) => {
      next(err);
    });
}

function validateUser(req, res, next) {
  userSchema
    .validate(req.body, { stripUnknown: true })
    .then((validation) => {
      req.body = validation;
      next();
    })
    .catch((err) => {
      next({ status: 400, message: err.message });
    });
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

function handleErrors(error, req, res, _next) {}
// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
  handleErrors,
};
