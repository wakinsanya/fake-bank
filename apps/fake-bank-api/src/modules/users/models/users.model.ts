import * as mongoose from 'mongoose';
import { AccountSchema } from '../../accounts/models/account.model';
import { Account } from '@fake-bank/api-common';

const UserSchema: mongoose.Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
    index: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  accounts: [AccountSchema]
});

export interface UserDocument extends mongoose.Document {
  email: string;
  firstName: string;
  lastName: string;
  accounts: Array<Account>;
}

export const User = mongoose.model('User', UserSchema);
