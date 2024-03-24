import { FastifyInstance } from "fastify";
import { redis } from "../lib/redis";

export async function getMetrics(app:FastifyInstance){
    app.get('/api/metrics', async (req, reply) => {
        const result = await redis.zRangeByScoreWithScores('metrics',0,50)

        const metrics = result.sort((a,b) => a.score - b.score )
        .map(item =>{
            return {
                shortLinkId: Number(item.value),
                clicks: Number(item.score)
            }
        })

        return metrics
    })
}