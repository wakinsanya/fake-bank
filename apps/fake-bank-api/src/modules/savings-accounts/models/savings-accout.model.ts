import {
  BaseAccountSchema,
  BaseAccountDocument
} from '../../accounts/models/base-account.model';
import * as mongoose from 'mongoose';

export class SavingsAccountSchema extends BaseAccountSchema {
  constructor() {
    super({
      annualPercentageYield: {
        type: Number,
        required: true
      }
    });
  }
}

export interface SavingsAccoutDocument extends BaseAccountDocument {
  annualPercentageYield: number;
}

export const SavingsAccount = mongoose.model(
  'SavingsAccount',
  new SavingsAccountSchema()
);
