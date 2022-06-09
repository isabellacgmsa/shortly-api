import joi from "joi"

const createShortUrlSchema = joi.object({
        url: joi.string().required()
})

export default createShortUrlSchema