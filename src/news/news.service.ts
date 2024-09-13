import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { New } from './schemas/new.schema';
import { InjectModel } from '@nestjs/mongoose';
import { WsException } from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';


@Injectable()
export class NewsService {
    constructor(
        @InjectModel(New.name) private readonly newsModel: Model<New>,
        private jwtService: JwtService
    ) { }
    // return all news (http request) (when user opens the home screen start with past news)
    async findAll(){
        const news=await this.newsModel.find();
        return news;
    }
    // create news realtime event
    async createNews(client: any, payload: any): Promise<New> {
        // check data correctness
        await this.checkData(payload)
        // check if the user is admin
        await this.checkAdmin(payload)
        // create and return then emit
        const news: any = await this.newsModel.create({ ...payload.news });
        return news._doc;
    }
    // update news realtime event
    async updateNews(client: any, payload: any): Promise<New> {
        await this.IsValidId(payload)
        await this.checkData(payload)
        await this.checkAdmin(payload)
        const news: any = await this.newsModel.findByIdAndUpdate(
            payload.news.id,
            { title:payload.news.title,description:payload.news.description }
        );
        return news._doc;
    }
    // delete news realtime event
    async deleteNews(client: any, payload: any): Promise<String> {
        await this.IsValidId(payload)
        await this.checkAdmin(payload)
        await this.newsModel.findByIdAndDelete(payload.news.id);
        return payload.news.id;
    }

    // a helper method to check the id 
    private async IsValidId(payload:any){
        if(!payload?.news?.id){
            console.log('Bad Data')
            throw new WsException('Bad Data');
        } else if(!Types.ObjectId.isValid(payload.news.id)){
            console.log('Must be valid mongodb id')
            throw new WsException('Must be valid mongodb id');
        }else{
            const found=await this.newsModel.findById(payload.news.id)
            if(!found){
                console.log('news not found')
                throw new WsException('news not found');
            }
        }
    }
    // a helper method to check the data 
    private async checkData(payload:any){
        if (!payload?.news?.title || !payload?.news?.description) {
            console.log('Bad Data')
            throw new WsException('Bad Data');
        }
    }
    // a helper method to check the authorization
    private async checkAdmin(payload:any){
        if (!payload?.token) {
            console.log('Invalid credentials.')
            throw new WsException('Invalid credentials.');
        } else {
            try {
                const extractedPayLoad = await this.jwtService.verifyAsync(
                    payload.token,
                    { secret: process.env.TOKEN_SECRET }
                );
                if(extractedPayLoad.role!=='ADMIN'){
                    throw new Error('Forbidden')
                }
            } catch(error){
                if(error.message==='Forbidden'){
                    console.log('Forbidden')
                    throw new WsException('Forbidden');
                }else{
                    console.log('Invalid credentials.')
                    throw new WsException('Invalid credentials.');
                }
            }
        }
    }
}
