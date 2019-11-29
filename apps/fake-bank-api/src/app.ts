import * as express from 'express';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as glob from 'glob';
import { API_ROOT_PATH } from './constants';

class App {
  app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(this.createRootRouter());
    this.initConfig();
    this.initMongoConnection();
  }

  private initConfig() {
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(bodyParser.json({ limit: '4mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '4mb', extended: true }));
  }

  private createRootRouter(): express.Router {
    return glob
      .sync('**/*.ts', { cwd: API_ROOT_PATH })
      .filter(pathname => pathname.endsWith('routes.ts'))
      .map(pathname => require(`./${pathname}`))
      .reduce(
        (rootRouter, router) => rootRouter.use(router),
        express.Router({ mergeParams: true })
      );
  }

  private initMongoConnection() {
    const dbName = 'fake-bank-dev';
    mongoose
      .connect(`mongodb://localhost:27017/${dbName}?retryWrites=true`, {
        dbName,
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log(`Conncted to local MongoDB database: ${dbName}`);
      })
      .catch(e => {
        console.error(e);
      });
  }
}

// expose app
export default new App().app;
