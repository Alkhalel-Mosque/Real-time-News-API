import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength } from "class-validator";

export class LoginDto {

    @IsNotEmpty() @IsEmail()
    email: number;

    @IsNotEmpty() @IsString() @MinLength(6) @MaxLength(12)
    password: string;
}