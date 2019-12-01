import { Schema, Document, SchemaDefinition } from 'mongoose';

export class BaseAccountSchema extends Schema {
  constructor(customSchemaConfig: SchemaDefinition) {
    super({
      ...customSchemaConfig,
      owner: {
        type: Schema.Types.ObjectId,
        required: true
      },
      balance: {
        type: Number,
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
