import { ApiProperty } from '@nestjs/swagger';
import { PRODUCT_STATUS } from 'src/common';
import { BaseDto } from 'src/core';

export class CreateProductDto extends BaseDto<CreateProductDto> {
  @ApiProperty({
    enum: PRODUCT_STATUS,
    default: PRODUCT_STATUS.RECRUITMENT,
    description: '상품상태',
  })
  status: PRODUCT_STATUS;

  @ApiProperty({ description: '상품명' })
  name: string;
}
