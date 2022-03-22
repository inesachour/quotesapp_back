import {
  Controller,
  Get,
  Post,
  Body,
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

  @Get('categories/:search?')
  getAllCategories(@Param('search') search: string): any {
    const categories = this.quoteService.getAllCategories(search);
    return categories;
  }

  @Get('detail/:id')
  async findOne(@Param('id') id: string) {
    const quote = await this.quoteService.getQuoteById(id);
    return quote;
  }

  @Get(':category/:search?')
  async findAllWithCategory(
    @Param('category') category: string,
    @Param('search') search: string,
  ) {
    const quotes = await this.quoteService.getQuotes(category, search);
    return quotes;
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
