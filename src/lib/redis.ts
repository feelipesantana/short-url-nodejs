import { createClient } from 'redis'

export const redis = createClient({
    url:'redis://:my_redis_password@localhost:6379',
})
redis.connect()

