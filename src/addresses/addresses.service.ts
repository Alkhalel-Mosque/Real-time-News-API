import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address } from './schemas/address.schema';
import { User } from 'src/users/schemas/user.schema';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectModel(Address.name) private readonly addressModel: Model<Address>,
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) { }

  async create(payload, createAddressDto: CreateAddressDto) {
    //  create address and associate it with the current user
    const createdAddress: any = await this.addressModel.create({ ...createAddressDto, userId: payload._id })
    return createdAddress;
  }

  async findAll(userId: string) {
    // check for user existence
    const user = await this.userModel.findById(userId)
    if (!user)
      throw new NotFoundException('User not found')

    // find addresses and return them
    const addresses = await this.addressModel.find({ userId: userId })
    return addresses
  }

  async remove(payload, addressId: string) {
    // check for address existence
    let address = await this.addressModel.findById(addressId)
    if (!address)
      throw new NotFoundException('Address not found')
    // check if the user is owner of the address
    if (String(address.userId) !== String(payload._id))
      throw new ForbiddenException('You can only delete your addresses')
    // delete the address and return a message
    await this.addressModel.deleteOne({ _id: addressId })
    return { message: "Address deleted successfully!!" };
  }
}
