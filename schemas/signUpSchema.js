import joi from "joi"

const signUpSchema = joi.object({
        name: joi.required(),
        email: joi.string().required(),
        password: joi.string().required(),
        confirm_password: joi.ref("password")
}).with("password","confirm_password")

export default signUpSchema;