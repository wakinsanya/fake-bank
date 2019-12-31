import * as express from 'express';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import { routeNotFound } from '@fake-bank/api-core';
import { API_NAME, API_ROUTE_SUFFIX, API_ROOT_PATH } from './constants';
import * as glob from 'glob';

class App {
  app: express.Application;

  constructor() {
    this.app = express();
    this.initConfig();
    this.app
      .use('/api/v1/', this.createRootRouter())
      .use('*', routeNotFound);
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
}

// expose app
export default new App().app;
