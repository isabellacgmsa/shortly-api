import joi from "joi"

const signUpSchema = joi.object({
        name: joi.string().max(16).required(),
        email: joi.string().email().required(),
        password: joi.string().max(16).required(),
        confirm_password: joi.ref("password")
}).with("password","confirm_password")

export default signUpSchema;