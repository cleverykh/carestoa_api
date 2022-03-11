import { BaseDto } from 'src/core/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsPhoneNumber, IsNotEmpty, IsEmail } from 'class-validator';
import { User } from 'src/modules/users/entities/user.entity';

export class UserLoginDto
  extends BaseDto<UserLoginDto>
  implements Partial<User>
{
  constructor(partial?: any) {
    super(partial);
  }

  @ApiProperty()
  @IsEmail({ message: '이메일을 정확히 입력해주세요.' })
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  password: string;
}
