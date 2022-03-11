import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';
import { BaseDto } from 'src/core/base.dto';
import { User } from '../entities/user.entity';

export class CreateUserDto
  extends BaseDto<CreateUserDto>
  implements Partial<User>
{
  constructor(partial?: any) {
    super(partial);
  }
  @ApiProperty({ description: '이메일' })
  @IsNotEmpty({ message: '휴대폰 번호를 입력해주세요.' })
  email: string;

  @ApiProperty({ description: '비밀번호' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ description: '사용자이름' })
  userName: string;

  @ApiProperty({ description: '주민등록번호 일부' })
  @IsNotEmpty()
  residentRegistrationNumber: string;

  @ApiPropertyOptional({ description: '핸드폰번호' })
  phoneNumber: string;
}
