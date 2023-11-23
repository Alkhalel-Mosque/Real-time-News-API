import { Controller, Get, Post, Body, Param, ValidationPipe, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IdParamsDto } from 'src/dto/id-params.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // create user (register)
    @Post()
    async create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }
    // update profile by id (a protected route)
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Patch(':id')
    async update(@Request() req, @Param(ValidationPipe) params: IdParamsDto, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.usersService.update(req.user, params.id, updateUserDto)
    }
}
