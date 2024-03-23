import { FastifyInstance } from "fastify";
import z from "zod";
import { sql } from "../lib/postgres";
import postgres from "postgres";

export async function createLinks(app: FastifyInstance){
    app.post('/links', async (request, reply) =>{
        const createSchema = z.object({
            code: z.string().min(3),
            url: z.string().url(),
        })
        const {code,url} = createSchema.parse(request.body);

      try{
        const result  = await sql/*sql*/`
        INSERT INTO short_links (code,original_url) VALUES (${code}, ${url})
        RETURNING id
    `
        const link = result[0]

        return reply.status(201).send({shortLinkId: link})
      }catch(err){
        if(err instanceof postgres.PostgresError){
            if(err.code === '23505'){
                reply.status(400).send('Duplicated code')
            }
        }

        console.error(err)

        return reply.status(500).send("Message internal error")
      }
    })
}

