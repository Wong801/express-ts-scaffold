import type { Express } from "express";
import defaultExpress from 'express'
import { AppConstructor, IApp } from "./models/interfaces/app-interface";
import loaders from "./loaders";
import responseMiddleware from "./api/middlewares/response-middleware";
import errorMiddleware from "api/middlewares/error-middleware";
import environment from "engine/environment";
import initMiddleware from "api/middlewares/init-middleware";
import IAM from "api/modules/iam";

export default class App implements IApp {
  readonly express: typeof defaultExpress
  private app: Express | null

  constructor({ express = defaultExpress }: AppConstructor = {}) {
    this.express = express
    this.app = null
  }

  init(): Express {
    this.app = this.express();
    this.app.disable('x-powered-by');
    
    this.app.use(this.express.json());
    this.app.use(this.express.urlencoded({ extended: true }));

    loaders({ app: this.app });

    this.app.use(responseMiddleware());
    this.app.use(errorMiddleware());
    
    return this.app
  }
  
  start(): Express {
    const app = this.init()

    app.listen(environment.engine.port, () => {
      console.log(`app is running on port ${environment.engine.port}...`)
    })

    return app
  }
}