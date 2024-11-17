export interface Environment {
  engine: {
    db: string;
    port: number;
    redis: {
      host?: string;
      port?: number;
      password?: string;
      username?: string;
      url?: string;
    };
    cors: string;
  };
  encrypt: {
    salt: string;
    secret: string;
  };
  cookie: {
    domain: string;
    duration: number;
  };
}