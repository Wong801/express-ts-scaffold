import environment from 'engine/environment';
import { createClient, RedisClientOptions } from 'redis';

const connectionOption: RedisClientOptions = {};

if (environment.engine.redis.url) {
  connectionOption.url = environment.engine.redis.url;
} else {
  connectionOption.username = environment.engine.redis.username;
  connectionOption.password = environment.engine.redis.password;
  connectionOption.socket = {
    host: environment.engine.redis.host,
    port: environment.engine.redis.port,
  };
}

const redis = createClient(connectionOption);

export default redis;