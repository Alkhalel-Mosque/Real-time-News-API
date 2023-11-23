import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateAddressDto {
    @ApiProperty({
        description: 'address name',
        example: 'whatever name'
    })
    @IsNotEmpty() @IsString()
    name: string;

    @ApiProperty({
        description: 'address city',
        example: 'whatever city'
    })
    @IsNotEmpty() @IsString()
    city: string;

    @ApiProperty({
        description: 'address street',
        example: 'whatever street'
    })
    @IsNotEmpty() @IsString()
    street: string;

    @ApiProperty({
        description: 'address location details',
        example: 'whatever location details'
    })
    @IsNotEmpty() @IsString()
    locationDetails: string;
}