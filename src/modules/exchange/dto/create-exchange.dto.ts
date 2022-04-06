import { ApiProperty } from '@nestjs/swagger';
import { FLAG_YN } from 'src/common';
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

  @ApiProperty({ description: '이미지 파일' })
  image: string;

  @ApiProperty({ description: 'Dump data insert' })
  dumpInsert?: FLAG_YN;
}
