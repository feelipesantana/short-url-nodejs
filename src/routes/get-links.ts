import { FastifyInstance } from "fastify";
import { sql } from "../lib/postgres";

export async function getLinks(app: FastifyInstance){
    app.get('/api/links',async () => {
        const result = await sql/*sql*/`
            SELECT * FROM short_links 
            ORDER BY created_at DESC
        `
        return result
    })
}