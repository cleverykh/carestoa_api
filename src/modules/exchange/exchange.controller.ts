import { Controller, Get, Post, Body } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginatedResponse } from 'src/common';
import { Exchange } from './entities/exchange.entity';

@ApiTags('EXCHANGE')
@Controller('exchange')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Post()
  @ApiOperation({ summary: '거래소 생성' })
  async exchangeCreate(
    @Body() createExchangeDto: CreateExchangeDto,
  ): Promise<Exchange | Exchange[]> {
    return await this.exchangeService.createForExchange(createExchangeDto);
  }

  @Get()
  @ApiOperation({ summary: '거래소 조회' })
  async exchangeInquiry(): Promise<PaginatedResponse<Exchange>> {
    return await this.exchangeService.findAllForExchange();
  }
}
