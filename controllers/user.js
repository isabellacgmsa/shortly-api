import connection from "../db.js"

export async function getUser(req,res){
        const { id }= req.params
        const {user} = res.locals

        if(user !== id){
                return res.sendStatus(401)
        }

        try{
                const result = connection.query(
                        `SELECT * FROM users`
                )
                res.send(result)
        }catch(err){
                res.send(err)
        }
}

export async function getRanking(req,res){

        try{
                const result = await connection.query(
                `SELECT      users.id,
                                        count(1) as "linksCount", 
                                        sum(su."visitCount") AS "visitCount" 
                        from users
                                join sections
                                        on sections."userId" = users.id
                                join shortened_urls as su
                                        on sections.id = su."sectionId"
                        group by users.id
                        ORDER BY "visitCount" desc
                        limit 10`
                );
                res.send(result.rows)
        }catch(err){
                res.send(err)
        }
}


// function _map{

// }