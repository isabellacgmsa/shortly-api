import joi from "joi"

const createShortUrlSchema = joi.object({
  url: joi
    .string()
    .regex(/^((http)|(https)|(ftp)):\/\/([\- \w]+\.)+\w{2,3}(\/ [%\-\w]+(\.\w{2,})?)*$/)
    .required(),
});

export default createShortUrlSchema