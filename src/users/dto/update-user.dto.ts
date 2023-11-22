import { IsString, IsEnum, IsNotEmpty, MinLength, MaxLength, IsPhoneNumber, IsOptional } from "class-validator";

export class UpdateUserDto {
    @MinLength(4) @MaxLength(20) @IsNotEmpty() @IsString() @IsOptional()
    fullName: string;

    @IsString() @IsOptional()
    birthday?: Date;

    @IsString() @IsOptional()
    country?: string;

    @IsEnum(['Male', 'Female']) @IsOptional()
    gender?: 'Male' | 'Female'

    @IsPhoneNumber() @IsOptional()
    phoneNumber?: string
}