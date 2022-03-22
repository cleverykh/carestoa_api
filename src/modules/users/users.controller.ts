import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
// import { CONST_USER_PERMISSION } from 'src/common';
import { AuthRolesGuard } from 'src/core/guards';
import { UserInfo } from 'src/common/decorators';

@ApiTags('USER')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'User 생성' })
  async userCreate(@Body() createUserDto: CreateUserDto): Promise<string> {
    return await this.usersService.createForUser(createUserDto);
  }

  @Get('/email-check')
  @ApiOperation({ summary: 'Email 체크' })
  async emailCheck(@Query('email') email: string): Promise<Object> {
    return await this.usersService.findOneforEmailCheck(email);
  }

  @Get('/me')
  @UseGuards(new AuthRolesGuard())
  @ApiOperation({ summary: '내 정보 가져오기' })
  @ApiBearerAuth()
  async myProfile(@UserInfo() userInfo: User): Promise<User> {
    return await this.usersService.findOneforMyProfile(userInfo);
  }

  //TODO : Admin 에서 사용자 정보 가져올 경우 구현

  // @UseGuards(new AuthRolesGuard(...CONST_USER_PERMISSION))
  // @Get('user/:userNo')
  // @ApiOperation({ summary: '사용자 정보 가져오기' })
  // @ApiBearerAuth()
  // async findOne(@Param('userNo') userNo: number): Promise<User> {
  //   console.log(`컨트롤러에서 user 값 :   ${userNo}`);
  //   return this.usersService.findOneForUser(userNo);
  // }

  // @Get('users')
  // @ApiBearerAuth()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Patch('user/:id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete('user/:id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
