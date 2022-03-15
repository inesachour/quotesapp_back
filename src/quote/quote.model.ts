import * as mongoose from 'mongoose';

export const QuoteSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  person: { type: String, required: true },
});

export interface Quote extends mongoose.Document {
  id: string;
  quote: string;
  person: string;
}
