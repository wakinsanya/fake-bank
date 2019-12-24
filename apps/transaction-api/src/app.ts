import * as express from 'express';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import { createRootRouter, routeNotFound } from '@fake-bank/api-core';
import { API_ROOT_PATH, API_ROUTE_SUFFIX } from './constants';

class App {
  app: express.Application;

  constructor() {
    this.app = express();
    this.app
      .use('/api/v1/', createRootRouter(API_ROOT_PATH, API_ROUTE_SUFFIX))
      .use('*', routeNotFound);
    this.initConfig();
  }

  private initConfig() {
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(bodyParser.json({ limit: '4mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '4mb', extended: true }));
  }
}

// expose app
export default new App().app;
