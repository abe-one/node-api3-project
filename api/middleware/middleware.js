const Users = require("../users/users-model");
const { userSchema, postSchema } = require("../../shared/schemas");

function logger(req, _res, next) {
  console.log(`{
  request-method: ${req.method},
  endpoint: ${req.originalUrl},
  time-received: ${new Date().toISOString()},
  `);
  next();
}

function validateUserId(req, _res, next) {
  const id = req.params.id;
  Users.getById(id)
    .then((user) => {
      if (!user) {
        next({ status: 404, message: `User with ID ${id} not found` });
      } else {
        req.user = user;
        next();
      }
    })
    .catch((err) => {
      next(err);
    });
}

const validateBody = (schema, body, next) =>
  schema
    .validate(body, { stripUnknown: true })
    .then((validation) => {
      body = validation;
      next();
    })
    .catch((err) => {
      next({ status: 400, message: err.message });
    });

function validateUser(req, _res, next) {
  validateBody(userSchema, req.body, next);
}

function validatePost(req, _res, next) {
  req.body.user_id = req.user.id;
  validateBody(postSchema, req.body, next);
}

// eslint-disable-next-line no-unused-vars
function handleErrors(err, _req, res, _next) {
  res.status(err.status || 500).json({
    note: "DB DEV: It's all gone wrong, horribly horribly wrong!!",
    message: err.message,
    stack: err.stack,
  });
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
  handleErrors,
};
