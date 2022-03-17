import { Min, Max } from 'class-validator';
import { Type, Expose } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Default } from '../decorators';

export class PaginatedResponse<ENTITY> {
  totalCount: number;
  items: ENTITY[];
}

export class PaginatedRequest {
  @ApiPropertyOptional({ description: '총 몇개 데이터를 가져올 것인가(LIMIT)' })
  take?: number;

  @ApiPropertyOptional({
    description: '페이지 단위(OFFSET) 계산법(take * (skip-1))',
  })
  skip?: number;
}
