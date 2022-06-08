import connection from "../db.js"
import bcrypt from "bcrypt"
import dayjs from "dayjs"
import { v4  as uuid} from "uuid"


export async function signUp(req,res){
        console.log("entrei")
        const {name, email, password} = req.body
        const encryptedPassword = bcrypt.hashSync(password, 10);
        try{
                await connection.query(
                  `INSERT INTO users (name, email, password) values ($1,$2,$3)`,
                  [name, email, encryptedPassword]
                );
                res.send("ok")
        }catch(err){
                return res.send(err)
        }
}

export async function  signIn(req,res){
        const {email, password}  = req.body

        try{
                const result = await connection.query(
                        `SELECT * from users where email = $1`,[email]
                )
                if(result.rowCount !== 1){
                        return res.sendStatus(401);
                }
                if (!(bcrypt.compareSync(password, result.rows[0].password))) {
                return res.status(401).send("bad password!")
                }

                const token = uuid()
                const id = result.rows[0].id
                const date = dayjs()

                connection.query(
                        `INSERT INTO sections ("token","tokenAvaible", "timeSectionCreated", "userId" ) values($1,$2,$3,$4)`,[token,true,date,id]
                )

                res.status(200).send(token)
        }catch(err){
                res.send(err)
        }
}
