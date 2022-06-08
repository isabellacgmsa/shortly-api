import joi from "joi";

const signInSchema = joi.object({
  email: joi.string().email().max(16).required(),
  password: joi.string().max(16).required()
});

export default signInSchema;
