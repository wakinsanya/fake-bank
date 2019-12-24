import { BaseTransactionApi } from './base-transaction-api';
import {
  TransactionRequest,
  TransactionResult,
  TransactionType
} from '@fake-bank/api-common';

export class TransactionApiV1 extends BaseTransactionApi {
  constructor() {
    super('v1');
  }

  evaluate(transactionRequest: TransactionRequest): TransactionResult {
    switch (transactionRequest.type) {
      case TransactionType.DEPOSIT:
        return this.evaluateDeposit(transactionRequest.shiftingAmount);
      case TransactionType.WITHDRAWAL:
        return this.evaluateWithdrawal(
          transactionRequest.balance,
          transactionRequest.shiftingAmount,
          transactionRequest.overdraftLimit
        );
      default:
        return {
          note: 'unprocessable transaction type',
          isAllowed: false
        };
    }
  }

  private evaluateWithdrawal(
    balance: number,
    shiftingAmout: number,
    overdraftLimit: number
  ) {
    const verdict: TransactionResult =
      balance + overdraftLimit - shiftingAmout >= 0
        ? {
            note: 'widthrawal is permissible',
            isAllowed: true
          }
        : {
            note: 'widthrawal is impermissible',
            isAllowed: false
          };
    return verdict;
  }

  private evaluateDeposit(shiftingAmount: number) {
    const verdict: TransactionResult =
      shiftingAmount > 0
        ? {
            note: 'depsoit is permissable',
            isAllowed: true
          }
        : {
            note: 'deposit is impermissible',
            isAllowed: false
          };
    return verdict;
  }
}
