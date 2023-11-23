import { Controller, Get, Post, Body, UseGuards, Param, Delete, ValidationPipe } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { Request } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { IdParamsDto } from 'src/dto/id-params.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Addresses')
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) { }

  // create address
  @UseGuards(AuthGuard)
  @Post()
  async create(@Request() req, @Body(ValidationPipe) createAddressDto: CreateAddressDto) {
    return this.addressesService.create(req.user, createAddressDto);
  }
  //  Retrieves all addresses associated with a user by user id
  @UseGuards(AuthGuard)
  @Get(':id')
  async findAll(@Param(ValidationPipe) params: IdParamsDto) {
    return this.addressesService.findAll(params.id);
  }
  // Removes a specified address from a user's profile by the address id
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Request() req, @Param(ValidationPipe) params: IdParamsDto) {
    return this.addressesService.remove(req.user, params.id);
  }
}
