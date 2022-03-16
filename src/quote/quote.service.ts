import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quote } from './quote.model';
import { QuoteCategoryEnum } from './enums/quote-category.enum';

@Injectable()
export class QuoteService {
  constructor(
    @InjectModel('Quote') private readonly quoteModel: Model<Quote>,
  ) {}

  async addQuote(createQuoteDto: CreateQuoteDto) {
    const newQuote = new this.quoteModel({
      quote: createQuoteDto.quote,
      person: createQuoteDto.person,
      category: createQuoteDto.category,
    });
    const result = await newQuote.save();
    return result.id;
  }

  async getQuotes(category: string) {
    const quotes = await this.quoteModel.find({ category: category });
    return quotes.map((quote) => ({
      id: quote.id,
      quote: quote.quote,
      person: quote.person,
      category: quote.category,
    }));
  }

  async getQuoteById(id: string) {
    const quote = await this.quoteModel.findById(id);
    if (!quote) {
      throw new NotFoundException('Quote Not Found');
    }
    return quote;
  }

  async updateQuote(id: string, updateQuoteDto: UpdateQuoteDto) {
    const quote = await this.getQuoteById(id);
    if (updateQuoteDto.quote) {
      quote.quote = updateQuoteDto.quote;
    }
    if (updateQuoteDto.person) {
      quote.person = updateQuoteDto.person;
    }
    if (updateQuoteDto.category) {
      quote.category = updateQuoteDto.category;
    }
    quote.save();
    return quote;
  }

  async deleteQuote(id: string) {
    const result = await this.quoteModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException('Quote Not Found');
    }
  }

  getAllCategories() {
    const categories = Array<Category>();
    Object.values(QuoteCategoryEnum).forEach((value) => {
      if (isNaN(parseInt(value.toString()))) {
        const c = new Category(value.toString());
        categories.push(c);
      }
    });
    return categories;
  }
}

class Category {
  constructor(public name: string) {}
}
