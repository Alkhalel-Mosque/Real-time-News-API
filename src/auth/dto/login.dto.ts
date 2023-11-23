import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    
    @ApiProperty({
        description: 'email of the user',
        example: 'email@gmail.com'
    })
    @IsNotEmpty() @IsEmail()
    email: number;

    @ApiProperty({
        description: 'password of the user',
        example: '123456'
    })
    @IsNotEmpty() @IsString() @MinLength(6) @MaxLength(12)
    password: string;
}