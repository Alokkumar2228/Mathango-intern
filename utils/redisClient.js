// redisClient.js
import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});

redisClient.on('error', (err) => {
  console.error(' Redis Client Error:', err);
});

redisClient.on('connect', () => {
  console.log(' Connected to Redis Cloud successfully');
});

await redisClient.connect();

export default redisClient;
