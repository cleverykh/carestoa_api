import { ApiProperty } from '@nestjs/swagger';
import { CONTRACT_STATUS, CRYPTOCURRENCY_SYMBOL, FLAG_YN } from 'src/common';
import { BaseDto } from 'src/core';
import { Exchange } from 'src/modules/exchange/entities/exchange.entity';

export class CreateContractDto
  extends BaseDto<CreateContractDto>
  implements Partial<CreateContractDto>
{
  constructor(partial?: any) {
    super(partial);
  }

  @ApiProperty({ description: '코인 송금 확인 된 datetime', default: null })
  joinDate: Date;

  @ApiProperty({
    description: '계약 진행상황',
    default: CONTRACT_STATUS.PREPARATION,
  })
  contractStatus: CONTRACT_STATUS;

  @ApiProperty({ description: '계약한 상품종류', default: null })
  productNo: number;

  @ApiProperty({
    description: '계약한 상품의 납부할 코인종류',
    enum: CRYPTOCURRENCY_SYMBOL,
    default: null,
  })
  cryptocurrencySymbol: CRYPTOCURRENCY_SYMBOL;

  @ApiProperty({ description: '계약 시작일', default: null })
  contractStartDate: Date;

  @ApiProperty({ description: '계약 종료일', default: null })
  contractEndDate: Date;

  @ApiProperty({ description: 'Deposit Address', default: null })
  depositAddress: string;

  @ApiProperty({ description: 'Destination Tag', default: null })
  destinationTag: string;

  @ApiProperty({ description: '보상 금액', default: null })
  compensation: number;

  @ApiProperty({
    enum: FLAG_YN,
    default: FLAG_YN.NO,
    description: '상품 약관동의',
  })
  productAgreement: FLAG_YN;

  @ApiProperty({ description: '사인 값', default: null })
  sign: string;

  @ApiProperty({
    description: '거래소 No to Array',
    type: [Number],
    default: [],
  })
  exchanges: Exchange[];
}
