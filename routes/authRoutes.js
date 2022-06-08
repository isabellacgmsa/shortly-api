import {Router} from "express"
import {signUp, signIn} from "../controllers/auth.js"
import validateSignUp from "../middlewares/validateSignUp.js"
import validateSignIn from "../middlewares/validateSignIn.js"

const authRoute = Router()

authRoute.post("/signup", validateSignUp, signUp);
authRoute.post("/signin", validateSignIn, signIn);

export default authRoute