import * as express from 'express';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import { createRootRouter, routeNotFound } from '@fake-bank/api-core';
import { API_NAME, API_ROUTE_SUFFIX, DB_NAME } from './constants';
import { from } from 'rxjs';
import { tap, mergeMap } from 'rxjs/operators';
import { User as UserModel } from './modules/users/models/users.model';
import { SavingsAccount } from './modules/savings-accounts/models/savings-accout.model';
import { CurrentAccount } from './modules/current-accounts/models/current-account.model';
import { MOCK_USERS } from './seed-data';
import {
  UserDocument,
  SavingsAccountDocument,
  CurrentAccountDocument
} from '@fake-bank/api-common';
const chalk = require('chalk');

class App {
  app: express.Application;

  constructor() {
    this.app = express();
    this.app
      .use('/api', createRootRouter(API_NAME, API_ROUTE_SUFFIX))
      .bind(this)
      .use('*', routeNotFound);
    this.initConfig();
    this.initMongoConnection();
  }

  private initConfig() {
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(bodyParser.json({ limit: '4mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '4mb', extended: true }));
  }

  private initMongoConnection() {
    from(
      mongoose.connect(
        `mongodb://localhost:27017/${DB_NAME}?retryWrites=true`,
        {
          dbName: DB_NAME,
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      )
    )
      .pipe(
        tap(() => {
          console.log(chalk.cyan(`Conncted to local MongoDB database: ${DB_NAME}`));
        }),
        mergeMap(() => {
          console.log(chalk.cyan(`Seeding database...`));
          return from(
            Promise.all([
              UserModel.deleteMany({}),
              SavingsAccount.deleteMany({}),
              CurrentAccount.deleteMany({})
            ])
          );
        }),
        mergeMap(() => {
          return from(UserModel.insertMany(MOCK_USERS));
        }),
        mergeMap((userDocs: UserDocument[]) => {
          return from(
            Promise.all([
              CurrentAccount.insertMany(
                userDocs.map(doc => ({
                  owner: doc._id,
                  balance: 1000,
                  overdraftLimit: 500
                }))
              ),
              SavingsAccount.insertMany(
                userDocs.map(doc => ({
                  owner: doc._id,
                  balance: 1000,
                  annualPercentageYield: 5
                }))
              )
            ])
          );
        }),
        mergeMap(
          ([currentAccounts, savingAccounts]: [
            CurrentAccountDocument[],
            SavingsAccountDocument[]
          ]) => {
            return from(
              Promise.all([
                ...currentAccounts.map(account => {
                  return UserModel.updateOne(
                    { _id: account.owner },
                    {
                      $push: {
                        accounts: {
                          modelRef: 'CurrentAccount',
                          model: account._id
                        }
                      }
                    }
                  );
                }),
                ...savingAccounts.map(account => {
                  return UserModel.updateOne(
                    { _id: account.owner },
                    {
                      $push: {
                        accounts: {
                          modelRef: 'SavingsAccount',
                          model: account._id
                        }
                      }
                    }
                  );
                }),
              ])
            );
          }
        )
      )
      .subscribe({
        next: () => console.log(chalk.cyan('Finished seeding database')),
        error: e => console.error(e)
      });
  }
}

// expose app
export default new App().app;
