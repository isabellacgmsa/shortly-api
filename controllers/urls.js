import { nanoid } from "nanoid";
import connection from "../db.js"
import dayjs from "dayjs"

export async function createShortUrl(req, res) {
        const { url } = req.body;
        const short_url = nanoid(10);
        const section = res.locals.section;
        const date = dayjs()
        try {
                const result = await connection.query(
                        `SELECT * from shortened_urls where "sectionId" = $1`
                        ,[section]
                )
                if(result.rowCount === 0){
                        return res.status(409).send(`url already exist, short_url: ${result.rows[0].shortenedUrl}`)
                }
                await connection.query(
                  `INSERT INTO shortened_urls ("sectionId","createDate","url","shortenedUrl","visitCount") 
                        values ($1,$2,$3,$4,$5)`,
                  [section, date, url,short_url,0]
                );
                res.status(201).send(`short_url: ${short_url}`)
        } catch (err) {
                res.send(err);
        }
}

export async function getShortUrl(req,res){
        const {id} = req.params
        try{
                const result = await connection.query(
                  `SELECT id,url,"shortenedUrl" from shortened_urls where id = $1`,[id]
                );

                if(result.rowCount === 0){
                        return res.sendStatus(404)
                }
                res.status(200).send(result.rows[0])
        }catch(err){
                res.send(err)
        }
}

export async function redirectUrl(req,res){
        const {shortUrl} = req.params

        try{
                const result = await connection.query(
                        `SELECT  * from shortened_urls where "shortenedUrl" = $1`,[shortUrl]
                )
                if(result.rowCount === 0){
                        return res.sendStatus(404)
                }
                const visitCount = result.rows[0].visitCount

                await connection.query(
                        `UPDATE shortened_urls SET "visitCount" = $1 where "shortenedUrl" = $2`,[Number(visitCount)+1, shortUrl]
                )
                const url = result.rows[0].url

                res.redirect(`http://${url}`)

        }catch(err){
                res.send(err)
        }
}

export async function deleteUrl(req,res){
        const { id } = req.params
        const {user} = res.locals
        console.log(user)
        try{
                const urlExist = await connection.query(
                        `SELECT id from shortened_urls where id = $1`,[id]
                )
                if(urlExist.rowCount === 0){
                        return res.sendStatus(404)
                }
                const result = await connection.query(
                        `SELECT 
                                * 
                        from
                                sections
                                join shortened_urls
                                        on sections.id = shortened_urls."sectionId"
                        where "userId" = $1 and shortened_urls.id = $2`,[user,id]
                );
               console.log(result.rows);

                if(result.rowCount !== 1){
                        return res.sendStatus(401);
                }
                await connection.query(
                  `DELETE FROM shortened_urls WHERE id = $1`,[id]
                );
                res.sendStatus(204)
        }catch(err){
                res.send(err)
        }
}
//  7e195e98-97db-4703-86ef-18cec447ab30