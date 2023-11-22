import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        private jwtService: JwtService
    ) { }


    async login(loginDto: LoginDto): Promise<any> {
        // check for email existence
        const user = await this.userModel.findOne({ email: loginDto.email });
        if (!user)
            throw new NotFoundException('You need to register first , No such email');
        
        // check password correctness
        const isMatch = await bcrypt.compare(loginDto.password, user.password);
        if (!isMatch)
            throw new UnauthorizedException('Invalid credentials');

        // creating access token and return it
        const payload = {
            _id: user._id,
            fullName: user.fullName,
            role: user.role
        }
        const access_token = await this.jwtService.signAsync(payload)
        return { access_token };
    }
}