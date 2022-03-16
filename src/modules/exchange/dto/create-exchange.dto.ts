import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { EXCHANGE_CODE } from 'src/common';
import { BaseDto } from 'src/core';
import { Exchange } from '../entities/exchange.entity';

export class CreateExchangeDto
  extends BaseDto<CreateExchangeDto>
  implements Partial<Exchange>
{
  constructor(partial?: any) {
    super(partial);
  }

  @ApiProperty({ description: '거래소명' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '거래소코드', enum: EXCHANGE_CODE })
  @IsNotEmpty()
  code: EXCHANGE_CODE;
}
