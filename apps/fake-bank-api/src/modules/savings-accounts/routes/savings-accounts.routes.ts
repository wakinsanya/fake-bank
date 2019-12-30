import { Router } from 'express';
import SavingsAccountController from '../controllers/savings-account.controller';

const savingsAccountRouter = Router({ mergeParams: true });

savingsAccountRouter
  .route('/savings-accounts')
  .post(SavingsAccountController.createAccount)
  .get(SavingsAccountController.listAccounts)
  .patch(SavingsAccountController.updateAccount);

savingsAccountRouter
  .route('/savings-accounts/:savingsAccountId')
  .delete(SavingsAccountController.deleteAccount);

export default savingsAccountRouter;
