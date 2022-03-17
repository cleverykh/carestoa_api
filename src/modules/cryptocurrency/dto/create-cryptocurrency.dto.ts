import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/core';

export class CreateCryptocurrencyDto extends BaseDto<CreateCryptocurrencyDto> {
  @ApiProperty({ description: '암호화폐명' })
  name: string;

  @ApiProperty({ description: '암호화폐코드' })
  code: string;
}
