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
                        `SELECT * from shortened_urls where id = $1`
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
//  7e195e98-97db-4703-86ef-18cec447ab30