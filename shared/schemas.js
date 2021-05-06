const yup = require("yup");
const { schemaMessages: errors } = require("./errorMessages");

const userSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required(errors[0])
    .min(3, errors[1])
    .max(127, errors[2]),
});

const postSchema = yup.object({
  text: yup.string().trim().required(errors[3]).max(140, errors[4]),

  user_id: yup.string().trim().required(errors[5]),
});

module.exports = { userSchema, postSchema };
