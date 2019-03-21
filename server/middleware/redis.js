const session = require('express-session'),
      redis = require('redis'),
      RedisStore = require('connect-redis')(session);

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  logErrors: true
});


exports.redisSession = session({
    store: new RedisStore({
      client: redisClient
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
});
