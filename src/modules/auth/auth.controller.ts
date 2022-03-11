import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/user/login')
  login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.userLogin(userLoginDto);
  }
}
