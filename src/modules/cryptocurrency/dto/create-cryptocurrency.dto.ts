import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/core';

export class CreateCryptocurrencyDto extends BaseDto<CreateCryptocurrencyDto> {
  @ApiProperty({ description: '암호화폐명' })
  name: string;

  @ApiProperty({ description: '암호화폐코드' })
  code: string;

  @ApiProperty({ description: '이미지 파일' })
  image: string;

  @ApiProperty({ description: '송금 주소' })
  depositAddress: string;
}
