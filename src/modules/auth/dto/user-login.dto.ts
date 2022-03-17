import { BaseDto } from 'src/core/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, Length } from 'class-validator';
import { User } from 'src/modules/users/entities/user.entity';

export class UserLoginDto
  extends BaseDto<UserLoginDto>
  implements Partial<User>
{
  constructor(partial?: any) {
    super(partial);
  }

  @ApiProperty({ description: '이메일' })
  email: string;

  @ApiProperty({ description: '비밀번호' })
  password: string;
}
