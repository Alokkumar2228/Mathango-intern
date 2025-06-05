import redisClient from "../utils/redisClient.js";
import CustomError from "./customError.js";

const rateLimit = async (req, res, next) => {
    const limit = 30;
    const expire = 60;

    try {
        const ip = req.ip || req.connection.remoteAddress;
        const key = `rateLimit:${ip}`;

        const current = await redisClient.incr(key);

        if (current === 1) {
            await redisClient.expire(key, expire);
        }

        if (current > limit) {
            return next(new CustomError("Too many requests", 429));
        }

        next();

    } catch (err) {
        console.error('Rate limiting failed:', err);
        next();
    }
}

export default rateLimit;