import connection from "../db.js"

export default async function signUp(req,res){
        console.log("entrei")
        const {name, email, password} = req.body
        try{
                await connection.query(
                        `INSERT INTO users (name, email, password) values ($1,$2,$3)`,[name,email,password]
                )
                res.send("ok")
        }catch(err){
                return res.send(err)
        }
}