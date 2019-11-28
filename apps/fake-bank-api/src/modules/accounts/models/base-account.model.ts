import { Schema, Document, SchemaDefinition } from 'mongoose';

export class BaseAccountSchema extends Schema {
  constructor(customSchemaConfig: SchemaDefinition) {
    super({
      ...customSchemaConfig,
      owner: {
        Type: Schema.Types.ObjectId,
        required: [true, 'owner is required'],
        ref: 'User'
      },
      balance: {
        type: Number,
        required: [true, 'balance is required'],
        default: 0
      }
    });
    this.set('timestamps', true);
  }
}

export interface BaseAccountDocument extends Document {
  owner: string;
  balance: number;
}
