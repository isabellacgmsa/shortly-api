import { Router } from "express"

import {getUser, getRanking} from "../controllers/user.js"
import validateToken from "../middlewares/validateToken.js"

const userRoutes = Router()

userRoutes.get("/users/:id", validateToken, getUser);
userRoutes.get("/ranking", getRanking);

export default userRoutes