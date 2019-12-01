import { Schema } from 'mongoose';

export const AccountSchema: Schema = new Schema({
  model: {
    type: Schema.Types.ObjectId,
    required: true
  },
  modelRef: {
    type: String,
    required: true,
    enum: ['CurrentAccount', 'SavingsAccount']
  }
});

export interface Account {
  model: string;
  modelRef: string;
}
