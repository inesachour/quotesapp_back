import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuoteModule } from './quote/quote.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    QuoteModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:yhnlpbZWoBMGErjA@cluster0.gbprk.mongodb.net/quotesdb?retryWrites=true&w=majority',
    ),
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
