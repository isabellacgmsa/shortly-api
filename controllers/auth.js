import connection from "../db.js"
import bcrypt from "bcrypt"
import dayjs from "dayjs"
import { v4  as uuid} from "uuid"


export async function signUp(req,res){
        const {name, email, password} = req.body
        const encryptedPassword = bcrypt.hashSync(password, 10);
        try{
                await connection.query(
                  `INSERT INTO users (name, email) values ($1,$2)`,
                  [name, email]
                );
                
                const result = await connection.query(
                  `SELECT id FROM users where email = $1`
                  ,[email]
                );
                await connection.query(
                  `INSERT INTO passwords (password,"userId") values($1,$2)`,
                  [encryptedPassword, result.rows[0].id]
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
                        `SELECT 
                                * 
                        from users 
                                join passwords
                                        on users.id = passwords."userId"
                        where email = $1
                        `,[email]
                )

                if(result.rowCount !== 1){
                        return res.sendStatus(401);
                }
                if (!(bcrypt.compareSync(password, result.rows[0].password))) {
                        return res.status(401).send("bad password!")
                }

                const token = uuid()
                const {userId} = result.rows[0]
                const date = dayjs()

                await connection.query(
                  `INSERT INTO sections ("token", "createDate", "finishDate","userId" ) values($1,$2,$3,$4)`,
                  [token, date, null, userId]
                );

                res.status(200).send(token)
        }catch(err){
                res.send(err)
        }
}
