import connection from "../db.js"

export default async function validateToken(req,res,next){
       const { authorization } = req.headers;
       if (!authorization) {
         return res.status(404).send("authorization missed");
       }
       const token = authorization.replace("Bearer", "").trim();

       try{
               const result = await connection.query(
                       `SELECT * FROM sections where token = $1`,[token]
               )
               if(result.rowCount !== 1){
                       return res.status(401).send("token not found");
               }
                const {tokenAvaible} = result.rows[0]
                if(!tokenAvaible){
                        return res.status(401).send("token not avaible")
                }
                next()

       }catch(err){
                return res.sendStatus(400)
       }

}