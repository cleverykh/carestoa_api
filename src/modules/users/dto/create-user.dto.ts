import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IS_ENUM,
  MinLength,
} from 'class-validator';
import { FLAG_YN } from 'src/common/interfaces/flag-yn.type';
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
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: '비밀번호' })
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({ description: '사용자이름' })
  userName: string;

  @ApiProperty({ description: '생년월일' })
  @IsNotEmpty()
  dateBirth: string;

  @ApiPropertyOptional({ description: '핸드폰번호' })
  phoneNumber: string;

  @ApiProperty({
    enum: FLAG_YN,
    default: FLAG_YN.NO,
    description: '서비스이용약관',
  })
  @IsNotEmpty()
  serviceAgreement: FLAG_YN;

  @ApiProperty({
    enum: FLAG_YN,
    default: FLAG_YN.NO,
    description: '개인정보이용약관',
  })
  @IsNotEmpty()
  privacyTerms: FLAG_YN;

  @ApiProperty({
    enum: FLAG_YN,
    default: FLAG_YN.NO,
    description: '마케팅수신이용약관',
  })
  @IsNotEmpty()
  marketingTerms: FLAG_YN;
}
