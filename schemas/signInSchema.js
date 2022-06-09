import joi from "joi";

const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().max(16).required()
});

export default signInSchema;
