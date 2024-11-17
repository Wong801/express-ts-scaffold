import { Environment } from 'models/interfaces/engine/environment-interface';

const systemEnv: Environment = {
  engine: {
    db: process.env.DATABASE_URL,
    port: Number(process.env.PORT || '3000'),
    redis: {
      host: process.env.REDIS_HOST,
      password: process.env.REDIS_PASSWORD,
      username: process.env.REDIS_USERNAME,
      port: Number(process.env.REDIS_PORT),
      url: process.env.REDIS_URL,
    },
    cors: process.env.CORS_DOMAIN,
  },
  encrypt: {
    salt: process.env.ENCRYPT_SALT,
    secret: process.env.ENCRYPT_SECRET,
  },
  cookie: {
    domain: process.env.COOKIE_DOMAIN,
    duration: Number(process.env.COOKIE_DURATION || '24'),
  },
};

export default systemEnv