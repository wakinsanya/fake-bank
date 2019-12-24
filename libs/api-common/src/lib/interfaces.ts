import { Document } from 'mongoose';
import { TransactionType } from './enums';

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  accounts: Array<Account>;
}


export interface Account {
  model: string;
  modelRef: string;
}

export interface BaseAccount {
  owner: string;
  balance: number;
}

export interface CurrentAccount extends BaseAccount {
  overdraftLimit: number;
}

export interface SavingsAccount extends BaseAccount {
  annualPercentageYield: number;
}

export interface UserDocument extends User, Document {}

export interface CurrentAccountDocument extends CurrentAccount, Document {}

export interface SavingsAccountDocument extends SavingsAccount, Document {}

export interface TransactionResult {
  readonly note: string;
  readonly isAllowed: boolean;
}

export interface TransactionRequest {
  balance: number;
  shiftingAmount: number;
  overdraftLimit: number;
  type: TransactionType
}
