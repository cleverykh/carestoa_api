import { ApiProperty } from '@nestjs/swagger';
import {
  Contains,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import { FLAG_YN } from 'src/common';
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
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: '비밀번호' })
  @IsNotEmpty()
  @MaxLength(12)
  @MinLength(8)
  password: string;

  @ApiProperty({ description: '사용자이름' })
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ description: '생년월일' })
  @IsNotEmpty()
  dateBirth: string;

  @ApiProperty({ description: '핸드폰번호' })
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    enum: FLAG_YN,
    default: FLAG_YN.NO,
    description: '회원가입약관',
  })
  @IsNotEmpty()
  @Contains('Y')
  serviceAgreement: FLAG_YN;

  @ApiProperty({
    enum: FLAG_YN,
    default: FLAG_YN.NO,
    description: '개인정보이용약관',
  })
  @IsNotEmpty()
  @Contains('Y')
  privacyTerms: FLAG_YN;

  @ApiProperty({
    enum: FLAG_YN,
    default: FLAG_YN.NO,
    description: '제3자정보제공동의',
  })
  @IsNotEmpty()
  @Contains('Y')
  provideInfoAgreement: FLAG_YN;

  @ApiProperty({
    enum: FLAG_YN,
    default: FLAG_YN.NO,
    description: '마케팅수신이용약관',
  })
  @IsNotEmpty()
  marketingTerms: FLAG_YN;
}
