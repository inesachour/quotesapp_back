import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post()
  async create(@Body() createQuoteDto: CreateQuoteDto) {
    const newQuote = await this.quoteService.addQuote(createQuoteDto);
    return newQuote;
  }

  @Get('categories')
  getAllCategories() {
    const categories = this.quoteService.getAllCategories();
    console.log(categories);
    return categories;
  }

  @Get(':category')
  async findAllWithCategory(@Param('category') category: string) {
    const quotes = await this.quoteService.getQuotes(category);
    return quotes;
  }

  @Get('detail/:id')
  async findOne(@Param('id') id: string) {
    const quote = await this.quoteService.getQuoteById(id);
    return quote;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuoteDto: UpdateQuoteDto,
  ) {
    const quote = await this.quoteService.updateQuote(id, updateQuoteDto);
    return quote;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.quoteService.deleteQuote(id);
    return null;
  }
}
