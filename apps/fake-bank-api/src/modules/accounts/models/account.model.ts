import { Schema } from 'mongoose';

export const AccountSchema: Schema = new Schema({
  type: {
    type: String,
    required: [true, 'account type is required'],
    model: {
      type: Schema.Types.ObjectId,
      required: [true, 'acccont model is required']
    },
    modelRef: {
      type: String,
      required: true,
      enum: ['CurrentAccount', 'SavingsAccount']
    }
  }
});

export interface Account {
  model: string;
  modelRef: string;
  type: string;
}
