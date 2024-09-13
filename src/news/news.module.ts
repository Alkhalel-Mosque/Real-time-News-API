import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { New, NewSchema } from './schemas/new.schema';
import { NewsGateway } from './news.gateway';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: New.name, schema: NewSchema }]),
  ],
  providers: [NewsGateway, NewsService],
  controllers: [NewsController],
})
export class NewsModule {}
