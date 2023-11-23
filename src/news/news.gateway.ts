import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { NewsService } from './news.service';

@WebSocketGateway()
export class NewsGateway {
  constructor(private readonly authService: NewsService) { }

  @WebSocketServer()
  server;

  // realtime create news
  @SubscribeMessage('createNews')
  async createNews(client: any, payload: any) {
    const news = await this.authService.createNews(client, payload)
    // broadcast the news
    this.server.emit('ReceiveNews', news)
  }

  // realtime update news
  @SubscribeMessage('updateNews')
  async updateNews(client: any, payload: any) {
    const news = await this.authService.updateNews(client, payload)
    // broadcast the updated news
    this.server.emit('NewsUpdated', news)
  }

  @SubscribeMessage('deleteNews')
  async deleteNews(client: any, payload: any) {
    const id = await this.authService.deleteNews(client, payload)
    // broadcast the deleted news
    this.server.emit('NewsDeleted', { id })
  }
}
