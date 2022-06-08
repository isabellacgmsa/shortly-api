import {Router} from "express"
import signUp from "../controllers/auth.js"
import validateSignUp from "../middlewares/validateSignUp.js"

const authRoute = Router()

authRoute.post("/signup", validateSignUp, signUp);


export default authRoute