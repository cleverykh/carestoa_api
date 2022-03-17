import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, MinLength } from 'class-validator';
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
  name: string;

  @ApiProperty({ description: '거래소코드' })
  code: string;
}
