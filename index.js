import express, {json} from "express"
import cors from "cors"
import dotenv from "dotenv"

import authRouter from "./routes/authRoutes.js"
import getUsers from "./controllers/user.js"
import urlRouter from "./routes/urlRoutes.js"
dotenv.config()
const app = express()

app.use(json())
app.use(cors())

app.use(authRouter)
app.use(urlRouter)




app.listen(process.env.PORT, () => {console.log(`listening on port ${process.env.PORT}`)})