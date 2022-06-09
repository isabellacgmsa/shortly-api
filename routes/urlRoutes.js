import { Router } from "express"

import validateToken from "../middlewares/validateToken.js"
import validateUrl from "../middlewares/validateUrl.js"
import {createShortUrl, getShortUrl} from "../controllers/urls.js"


const urlRouter = Router()

urlRouter.post("/urls/shorten",validateToken,validateUrl,createShortUrl)
urlRouter.get("/urls/:id", getShortUrl);


export default urlRouter