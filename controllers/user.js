import connection from "../db.js"

export async function getUser(req,res){
        const { id }= req.params
        const {user} = res.locals


        if(Number(user) !== Number(id)){
                return res.sendStatus(401)
        }

        try{
                // PRIMEIRO PEGA AS INFOS DO USER E DEPOIS PEGA AS SHORTS URLS DELE
                const resultUser = await connection.query(
                  `SELECT users.id, users.name, sum(su."visitCount") as "visitCount" from users
                        join sections
                                on users.id = sections."userId"
                        join shortened_urls as su
                                on sections.id = su."sectionId"
                        where users.id = $1        
                        group by users.id`,
                  [id]
                );
                if(resultUser.rowCount === 0){
                        return res.sendStatus(404)
                }
                const resultShortUrls = await connection.query(
                `SELECT su.id, su.url, su."shortenedUrl", su."visitCount" from shortened_urls  as su
                        join sections
                                on su."sectionId" = sections.id
                        where sections."userId" = $1  `,[id]
                );

                const response = _mapShortenedUrls(resultUser, resultShortUrls)
                res.send(response);
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


function _mapShortenedUrls(user,shortened_urls){
        const {rows} = shortened_urls
        const {id, name, visitCount } = user.rows[0]
        
        const shortenedUrls = rows.map( e => {
                return e
        })
        const response = {
          id,
          name,
          visitCount,
          shortenedUrls
        };
        return response

}