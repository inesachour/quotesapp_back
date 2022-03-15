import * as mongoose from 'mongoose';
import { QuoteCategoryEnum } from './enums/quote-category.enum';

export const QuoteSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  person: { type: String, required: true },
  category: {
    type: String,
    enum: Object.values(QuoteCategoryEnum),
    required: true,
  },
});

export interface Quote extends mongoose.Document {
  id: string;
  quote: string;
  person: string;
  category: QuoteCategoryEnum;
}
