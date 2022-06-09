import { Router } from "express"

import validateToken from "../middlewares/validateToken.js"
import validateUrl from "../middlewares/validateUrl.js"
import {createShortUrl} from "../controllers/urls.js"


const urlRouter = Router()

urlRouter.post("/urls/shorten",validateToken,validateUrl,createShortUrl)

export default urlRouter