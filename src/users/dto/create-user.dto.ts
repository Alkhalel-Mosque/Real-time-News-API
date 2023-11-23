import { IsString, IsEmail, IsNotEmpty ,MinLength,MaxLength} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        description: 'full name of the user',
        example: 'FullFirstName'
    })
    @MinLength(4) @MaxLength(20) @IsNotEmpty() @IsString()
    fullName: string;

    @ApiProperty({
        description: 'email of the user',
        example: 'firstEmail@gmail.com'
    })
    @IsNotEmpty() @IsEmail()
    email: number;
    
    @ApiProperty({
        description: 'password of the user',
        example: '123456'
    })
    @IsNotEmpty() @IsString() @MinLength(6) @MaxLength(12)
    password: string;
    
    specificCredential?: string;
}