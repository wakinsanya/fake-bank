import { Router } from 'express';
import CurrentAccountController from '../controllers/current-account.controller';

const currentAccountRouter = Router({ mergeParams: true });

currentAccountRouter
  .route('/current-accounts')
  .post(CurrentAccountController.createAccount)
  .get(CurrentAccountController.getAccount)
  .patch(CurrentAccountController.updateAccount);

currentAccountRouter
  .route('/current-accounts/:currentAccountId')
  .post(CurrentAccountController.createAccount)
  .get(CurrentAccountController.getAccount)
  .patch(CurrentAccountController.updateAccount);

export default currentAccountRouter;
