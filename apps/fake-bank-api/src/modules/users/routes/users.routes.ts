import { Router } from 'express';
import UsersController from '../controllers/users.controller';

const usersRouter = Router({ mergeParams: true });

usersRouter
  .route('/users')
  .post(UsersController.createUser)
  .get(UsersController.listUsers)
  .patch(UsersController.updateUser);

usersRouter.route('/users/:userId').delete(UsersController.deleteUser);

usersRouter
  .route('/users/transaction')
  .post(UsersController.processTransaction)

export default usersRouter as Router;
