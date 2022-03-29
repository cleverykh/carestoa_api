import { ApiProperty } from '@nestjs/swagger';
import { CONTRACT_STATUS, FLAG_YN } from 'src/common';
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

  @ApiProperty({ description: '계약한 상품의 납부할 코인종류', default: null })
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

  @ApiProperty({
    enum: FLAG_YN,
    default: FLAG_YN.NO,
    description: '상품 약관동의',
  })
  productAgreement: FLAG_YN;

  @ApiProperty({ description: '사인 값' })
  sign: string;

  @ApiProperty({
    description: '거래소 No to Array',
    type: [Number],
    default: [],
  })
  exchanges: Exchange[];
}
