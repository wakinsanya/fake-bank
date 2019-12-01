import { Router } from 'express';
import UsersController from '../controllers/users.controller';

const usersRouter = Router({ mergeParams: true });

usersRouter
  .route('/users')
  .post(UsersController.createUser)
  .get(UsersController.getUser)
  .patch(UsersController.updateUser);

usersRouter
  .route('/users/:userId')
  .delete(UsersController.deleteUser);

export default usersRouter;
