import connection from "../db.js"

export async function getUsers(req,res){
        try{
                const result = connection.query(
                        `SELECT * FROM users`
                )
                res.send(result)
        }catch(err){
                res.send(err)
        }
}
export default getUsers;