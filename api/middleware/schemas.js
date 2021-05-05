const yup = require("yup");

const userSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("missing required name field")
    .min(3, "name must be at least 3 chars")
    .max(127, "name must be at most 127 chars"),
});

module.exports = { userSchema };
