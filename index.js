import express, {json} from "express"
import cors from "cors"
import dotenv from "dotenv"

import authRoute from "./routes/authRoutes.js"
import getUsers from "./controllers/user.js"

dotenv.config()
const app = express()

app.use(json())
app.use(cors())

app.use(authRoute)

app.get("/users", getUsers)



app.listen(process.env.PORT, () => {console.log(`listening on port ${process.env.PORT}`)})