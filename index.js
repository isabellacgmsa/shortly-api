import express, {json} from "express"
import cors from "cors"
import dotenv from "dotenv"

import authRoute from "./routes/authRoutes.js"

dotenv.config()
const app = express()

app.use(json())
app.use(cors())

app.use(authRoute)



app.listen(process.env.PORT, () => {console.log(`listening on port ${process.env.PORT}`)})