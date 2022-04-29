import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/authentication/:email')
  async authenticationNumberRequest(
    @Param('email') email: string,
  ): Promise<any> {
    return await this.authService.requestForAuthenticationNumber(email);
  }

  @Post('/user/login')
  async login(@Body() userLoginDto: UserLoginDto): Promise<String> {
    return await this.authService.userLogin(userLoginDto);
  }
}
