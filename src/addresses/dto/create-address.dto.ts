import { IsString, IsNotEmpty } from "class-validator";

export class CreateAddressDto {
    @IsNotEmpty() @IsString()
    name: string;

    @IsNotEmpty() @IsString()
    city: string;

    @IsNotEmpty() @IsString()
    street: string;

    @IsNotEmpty() @IsString()
    locationDetails: string;
}