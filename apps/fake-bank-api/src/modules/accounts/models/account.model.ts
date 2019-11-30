import { Schema } from 'mongoose';

export const AccountSchema: Schema = new Schema({
  type: {
    type: String,

    model: {
      type: Schema.Types.ObjectId
    },
    modelRef: {
      type: String,

      enum: ['CurrentAccount', 'SavingsAccount']
    }
  }
});

export interface Account {
  model: string;
  modelRef: string;
  type: string;
}
