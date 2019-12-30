import { Document } from 'mongoose';
import { TransactionType } from './enums';

export interface User {
  _id: string;
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
  _id: string;
  owner: string;
  balance: number;
}

export interface CurrentAccount extends BaseAccount {
  overdraftLimit: number;
}

export interface SavingsAccount extends BaseAccount {
  annualPercentageYield: number;
}

export interface UserDocument extends User, Document {
  _id: string;
}

export interface CurrentAccountDocument extends CurrentAccount, Document {
  _id: string;
}

export interface SavingsAccountDocument extends SavingsAccount, Document {
  _id: string;
}

export interface TransactionResult {
  readonly note: string;
  readonly isAllowed: boolean;
}

export interface TransactionRequest {
  balance?: number;
  shiftingAmount?: number;
  overdraftLimit?: number;
  type?: TransactionType
}
