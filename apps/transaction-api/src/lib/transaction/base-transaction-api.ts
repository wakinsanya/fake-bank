import { TransactionResult, TransactionRequest } from '@fake-bank/api-common';

export abstract class BaseTransactionApi {
  version: string;
  constructor(version: string) {
    this.version = version;
  }

  abstract evaluate(request: TransactionRequest): TransactionResult;
}
