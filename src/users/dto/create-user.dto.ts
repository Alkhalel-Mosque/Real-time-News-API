import { IsString, IsEmail, IsNotEmpty ,MinLength,MaxLength} from "class-validator";

export class CreateUserDto {
    @MinLength(4) @MaxLength(20) @IsNotEmpty() @IsString()
    fullName: string;

    @IsNotEmpty() @IsEmail()
    email: number;
    
    @IsNotEmpty() @IsString() @MinLength(6) @MaxLength(12)
    password: string;
    
    specificCredential?: string;
}