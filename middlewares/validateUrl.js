import createShortUrlSchema from "../schemas/createShortUrlSchema.js"
export default async function validateUrl(req,res,next){
        const validation = createShortUrlSchema.validate(req.body)

        if(validation.error){
                return res.status(422).send(validation.error.message)
        }
        next()
}