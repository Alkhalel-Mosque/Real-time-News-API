import { Injectable, BadRequestException, NotFoundException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }


    async create(createUserDto: CreateUserDto): Promise<User> {
        // check for email duplicates
        const alreadyUsedEmail = await this.userModel.findOne({ email: createUserDto.email })
        if (alreadyUsedEmail)
            throw new BadRequestException('This email is already used')

        // check for admin credentials
        let role: string = 'USER';
        if (createUserDto.specificCredential) {
            if (createUserDto.specificCredential !== String(process.env.specificCredential))
                throw new UnauthorizedException('Invalid admin credentials');
            role = 'ADMIN';
        }

        // hash the password
        const salt = await bcrypt.genSalt();
        createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

        // create user and return without password
        const userCreated: any = await this.userModel.create({ ...createUserDto, role })
        const { password, ...responseUser } = userCreated._doc;
        return responseUser;
    }


    async update(payload, id: string, updateUserDto: UpdateUserDto) {
        // check for user existence
        const user = await this.userModel.findById(id)
        if (!user)
            throw new NotFoundException('User not found')

        // check for same user (did it this way inorder in future to make the admin update others profiles)
        if (payload._id !== id)
            throw new ForbiddenException('You are not allowed to update someone other profile')

        // update profile and return without password
        const updatedUser: any = await this.userModel.findByIdAndUpdate(id, { ...updateUserDto })
        const { password, ...responseUser } = updatedUser._doc;
        return responseUser;
    }
}
