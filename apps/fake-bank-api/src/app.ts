import * as express from 'express';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import { IndexController } from './index.controller';

class App {
  app: express.Application;
  indexController: IndexController;

  constructor() {
    this.app = express();
    this.initConfig();
    this.initMongoConnection();
    this.indexController = new IndexController(this.app);
  }

  private initConfig() {
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(bodyParser.json({ limit: '4mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '4mb', extended: true }));
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
