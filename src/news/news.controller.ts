import { Controller, Get, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('news')
export class NewsController {
    constructor(private newsService: NewsService) { }

    // return all news
    @Get()
    @UseGuards(AuthGuard)
    findAll() {
        return this.newsService.findAll()
    }
}
