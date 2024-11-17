import defaultRedis from 'engine/db/redis';
import Module from 'api/modules';
import ApiError from 'api/api-error';

export default class Cache extends Module {
  public redis: typeof defaultRedis;
  private data: unknown;
  private key: string;

  constructor({ redis = defaultRedis }: { redis?: typeof defaultRedis } = {}) {
    super();
    this.name = 'cache';
    this.warnings = '';
    this.redis = redis;
    this.data = null;
    this.key = '';
  }

  setCache({ key = '', data = null }: { key?: string; data?: unknown }) {
    this.key = key;
    this.data = data;
  }

  async deploy(expiration: number = 24) {
    if (!this.key && !this.data) return true;

    let cacheData: string;
    if (!this.data) {
      throw new ApiError(
        'Internal server error',
        500,
        'There is no data to be cached'
      );
    }
    if (typeof this.data === 'string') {
      cacheData = this.data;
    } else {
      cacheData = JSON.stringify(this.data);
    }
    await this.redis.set(this.key, cacheData, {
      EX: expiration * 60 * 60,
    });
    return true;
  }

  async pull(key: string) {
    return await this.redis.get(key);
  }

  async delete() {
    await this.redis.del(this.key);
    return true;
  }
}