import { ApiProperty } from '@nestjs/swagger';
import { CONTRACT_STATUS } from 'src/common';
import { BaseDto } from 'src/core';
import { Exchange } from 'src/modules/exchange/entities/exchange.entity';

export class CreateContractDto
  extends BaseDto<CreateContractDto>
  implements Partial<CreateContractDto>
{
  constructor(partial?: any) {
    super(partial);
  }

  @ApiProperty({ description: '코인 송금 확인 된 datetime', default: '' })
  joinDate: Date;

  @ApiProperty({
    description: '계약 진행상황',
    default: CONTRACT_STATUS.PREPARATION,
  })
  contractStatus: CONTRACT_STATUS;

  @ApiProperty({ description: '계약한 상품' })
  productNo: number;

  @ApiProperty({ description: '계약한 상품의 납부 코인' })
  cryptocurrencyNo: number;

  @ApiProperty({ description: '계약 시작일' })
  contractStartDate: Date;

  @ApiProperty({ description: '계약 종료일' })
  contractEndDate: Date;

  @ApiProperty({ description: '코인 송금 금액' })
  contractAmount: number;

  @ApiProperty({ description: 'Deposit Address' })
  depositAddress: string;

  @ApiProperty({ description: 'Deposit valid datetime' })
  depositValidDate: Date;

  @ApiProperty({ description: 'Destination Tag' })
  destinationTag: string;

  @ApiProperty({ description: '보상 금액' })
  compensation: number;

  @ApiProperty({ description: '사인 값' })
  sign: string;

  @ApiProperty({ description: '거래소 No to Array', type: [Number] })
  exchanges: Exchange[];
}
