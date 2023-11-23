import { IsString, IsEnum, IsNotEmpty, MinLength, MaxLength, IsPhoneNumber, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class UpdateUserDto {
    @ApiProperty({
        description: 'full name of the user',
        example: 'FullFirstName'
    })
    @MinLength(4) @MaxLength(20) @IsNotEmpty() @IsString() @IsOptional()
    fullName: string;

    @ApiProperty({
        description: 'birthday of the user',
        example: '2016-05-18T16:00:00.000+00:00'
    })
    @IsString() @IsOptional()
    birthday?: Date;

    @ApiProperty({
        description: 'country of the user',
        example: 'Palestine'
    })
    @IsString() @IsOptional()
    country?: string;

    @ApiProperty({
        description: 'gender of the user',
        example: 'male'
    })
    @IsEnum(['Male', 'Female']) @IsOptional()
    gender?: 'Male' | 'Female'

    @ApiProperty({
        description: 'phone number of the user',
        example: '+963953123123'
    })
    @IsPhoneNumber() @IsOptional()
    phoneNumber?: string
}