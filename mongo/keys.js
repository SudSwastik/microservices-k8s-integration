module.exports = {
    mongoUSER: process.env.ME_CONFIG_MONGODB_ADMINUSERNAME,
    mongoPASS: process.env.ME_CONFIG_MONGODB_ADMINPASSWORD,
    mongoURI: process.env.ME_CONFIG_MONGODB_SERVER,
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT
};