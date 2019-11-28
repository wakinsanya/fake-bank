import {
  BaseAccountSchema,
  BaseAccountDocument
} from '../../accounts/models/base-account.model';
import * as mongoose from 'mongoose';

export class CurrentAccountSchema extends BaseAccountSchema {
  constructor() {
    super({
      overdraftLimit: {
        type: Number,
        default: 0
      }
    });
  }
}

export interface CurrentAccountDocument extends BaseAccountDocument {
  overdraftLimit: number;
}

export const CurrentAccount = mongoose.model(
  'CurrentAccount',
  new CurrentAccountSchema()
);
