import { Router } from 'express';
import { CurrentAccountController } from '../controllers/current-account.controller';

module.exports = Router({ mergeParams: true })
  .post('/api/current-accounts', CurrentAccountController.createAccount)
  .get('/api/current-accounts', CurrentAccountController.getAccount)
  .patch('/api/current-accounts', CurrentAccountController.updateAccount)
  .get(
    '/api/current-accounts/:currentAccountId',
    CurrentAccountController.listAccounts
  )
  .delete(
    '/api/current-accounts/:currentAccountId',
    CurrentAccountController.deleteAccount
  );
