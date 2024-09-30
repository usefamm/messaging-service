import { RedisClientType } from 'redis';
import redis from 'redis';

const redisClient: RedisClientType = redis.createClient({
    url: process.env.REDIS_URL,
});

redisClient.connect();

export default {
    cacheMessage: async (message: any) => {
        await redisClient.lPush('messages', JSON.stringify(message));
        await redisClient.expire('messages', 3600); // Expires after 1 hour
    },

    getMessages: async () => {
        const messages = await redisClient.lRange('messages', 0, -1);
        return messages.map(msg => JSON.parse(msg));
    },
};
