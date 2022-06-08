import joi from "joi"

const signUpSchema = joi.object({
        name: joi.required(),
        email: joi.email().required(),
        password: joi.password().required(),
        confirm_password: joi.ref("password")
}).with("password","confirm_password")

export default signUpSchema;