import { Router } from 'express';
import SavingsAccountController from '../controllers/savings-account.controller';

const savingsAccountRouter = Router({ mergeParams: true });

savingsAccountRouter
  .route('/current-accounts')
  .post(SavingsAccountController.createAccount)
  .get(SavingsAccountController.listAccounts)
  .patch(SavingsAccountController.updateAccount);

savingsAccountRouter
  .route('/current-accounts/:currentAccountId')
  .get(SavingsAccountController.listAccounts)
  .delete(SavingsAccountController.deleteAccount);

export default savingsAccountRouter;
