import { ApiProperty } from '@nestjs/swagger';
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
  email: string;

  @ApiProperty({ description: '비밀번호' })
  password: string;

  @ApiProperty({ description: '사용자이름' })
  userName: string;

  @ApiProperty({ description: '생년월일' })
  dateBirth: string;

  @ApiProperty({ description: '핸드폰번호' })
  phoneNumber: string;

  @ApiProperty({
    enum: FLAG_YN,
    default: FLAG_YN.NO,
    description: '회원가입약관',
  })
  serviceAgreement: FLAG_YN;

  @ApiProperty({
    enum: FLAG_YN,
    default: FLAG_YN.NO,
    description: '개인정보이용약관',
  })
  privacyTerms: FLAG_YN;

  @ApiProperty({
    enum: FLAG_YN,
    default: FLAG_YN.NO,
    description: '제3자정보제공동의',
  })
  provideInfoAgreement: FLAG_YN;

  @ApiProperty({
    enum: FLAG_YN,
    default: FLAG_YN.NO,
    description: '마케팅수신이용약관',
  })
  marketingTerms: FLAG_YN;
}
