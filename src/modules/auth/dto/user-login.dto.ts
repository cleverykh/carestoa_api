import { BaseDto } from 'src/core/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, MaxLength, MinLength } from 'class-validator';
import { User } from 'src/modules/users/entities/user.entity';

export class UserLoginDto
  extends BaseDto<UserLoginDto>
  implements Partial<User>
{
  constructor(partial?: any) {
    super(partial);
  }

  @ApiProperty({ description: '이메일' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: '비밀번호' })
  @IsNotEmpty()
  @MaxLength(12)
  @MinLength(8)
  password: string;
}
