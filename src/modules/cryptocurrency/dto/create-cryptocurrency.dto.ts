import { ApiProperty } from '@nestjs/swagger';
import { CRYPTOCURRENCY_SYMBOL } from 'src/common';
import { BaseDto } from 'src/core';

export class CreateCryptocurrencyDto extends BaseDto<CreateCryptocurrencyDto> {
  @ApiProperty({ description: '암호화폐명' })
  name: string;

  @ApiProperty({ description: '암호화폐심볼', enum: CRYPTOCURRENCY_SYMBOL })
  symbol: CRYPTOCURRENCY_SYMBOL;

  @ApiProperty({ description: '이미지 파일' })
  image: string;

  @ApiProperty({ description: '송금 주소' })
  depositAddress: string;
}
