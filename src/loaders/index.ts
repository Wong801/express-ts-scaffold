import { type Express } from 'express'
import routeLoader from './route'
import initMiddleware from 'api/middlewares/init-middleware'
import IAM from 'api/modules/iam'
import parseCookieMiddleware from 'api/middlewares/parse-cookie-middleware'
import Cache from 'api/modules/cache'

export default function ({ app }: { app: Express }): Express {
  app.use(initMiddleware({
    modules: {
      iam: new IAM(),
      cache: new Cache()
    }
  }))
  app.use(parseCookieMiddleware())
  routeLoader({ app })

  return app
}