import * as express from 'express';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as glob from 'glob';
import { API_ROOT_PATH, API_ROUTE_SUFFIX } from './constants';

class App {
  app: express.Application;

  constructor() {
    this.app = express();
    this.app.use('/api', this.createRootRouter()).use('*', this.routeNotFound);
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
      .filter(pathname => pathname.endsWith(API_ROUTE_SUFFIX))
      .map(pathname => require(`../${pathname}`).default)
      .filter(router => Object.getPrototypeOf(router) === express.Router)
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

  private routeNotFound(_req: express.Request, res: express.Response) {
    res.status(404).json({ error: 'not found' });
  }
}

// expose app
export default new App().app;
