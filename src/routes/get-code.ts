import { FastifyInstance } from "fastify";
import z from "zod";
import { sql } from "../lib/postgres";

export async function getCode(app:FastifyInstance){
    app.get('/:code', async (request, reply) =>{
        const getLinkSchema = z.object({
            code: z.string().min(3)
        })

        const {code} = getLinkSchema.parse(request.params);

        const result = await sql/*sql*/`
            SELECT id,original_url FROM short_links 
            WHERE short_links.code = ${code}
        `
        if(result.length === 0){
            return reply.status(400).send({message : "Link not found"})
        }
        const link = result[0]
        //301 - Permanente
        //302 - Temporário

        return reply.redirect(308, link.original_url);
    })
}