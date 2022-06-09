import { Router } from "express"

import validateToken from "../middlewares/validateToken.js"
import validateUrl from "../middlewares/validateUrl.js"
import {createShortUrl, getShortUrl,redirectUrl, deleteUrl} from "../controllers/urls.js"


const urlRouter = Router()

urlRouter.post("/urls/shorten",validateToken,validateUrl,createShortUrl)
urlRouter.get("/urls/:id", getShortUrl);
urlRouter.get("/urls/open/:shortUrl", redirectUrl);
urlRouter.delete("/urls/:id", validateToken, deleteUrl);



export default urlRouter