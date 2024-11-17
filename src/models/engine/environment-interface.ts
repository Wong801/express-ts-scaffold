export interface Environment {
  engine: {
    db: string
    port: number
  }
  encrypt: {
    salt: string
    secret: string
  }
  cookie: {
    domain: string
    duration: number
  }
}