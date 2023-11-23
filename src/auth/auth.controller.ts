import { Controller ,Post,Body,ValidationPipe,HttpCode,HttpStatus} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    
    // login route
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body(ValidationPipe)loginDto:LoginDto){
        return this.authService.login(loginDto)
    }
}
