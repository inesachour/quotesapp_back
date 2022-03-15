import { QuoteCategoryEnum } from '../enums/quote-category.enum';

export class CreateQuoteDto {
  quote: string;
  person: string;
  category: QuoteCategoryEnum;
}
