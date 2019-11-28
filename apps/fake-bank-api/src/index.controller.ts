import { Application } from 'express';
import { UsersController } from './modules/users/controllers/users.controller';

export class IndexController {
  private globalApiPrefix = '/api';
  private usersController: UsersController;

  constructor(private app: Application) {
    this.initRoutes();
  }

  private initRoutes() {
    this.app.route(`${this.globalApiPrefix}`).get((req, res) => {
      res.json({ foo: 'bar' });
    });
  }
}
