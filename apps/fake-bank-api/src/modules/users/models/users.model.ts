import * as mongoose from 'mongoose';
import { AccountSchema, Account } from '../../accounts/models/account.model';

const UserSchema: mongoose.Schema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'email is required'],
    lowercase: true,
    trim: true,
    unique: true,
    index: true
  },
  firstName: {
    type: String,
    required: [true, 'first name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'last name is required'],
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
