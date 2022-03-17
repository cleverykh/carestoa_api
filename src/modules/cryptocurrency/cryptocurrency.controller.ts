import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginatedResponse } from 'src/common';
import { CryptocurrencyService } from './cryptocurrency.service';
import { CreateCryptocurrencyDto } from './dto/create-cryptocurrency.dto';
import { Cryptocurrency } from './entities/cryptocurrency.entity';

@ApiTags('CRYPTOCURRENCY')
@Controller('cryptocurrency')
export class CryptocurrencyController {
  constructor(private readonly cryptocurrencyService: CryptocurrencyService) {}

  @Post()
  @ApiOperation({ summary: '암호화폐 생성' })
  async cryptocurrencyCreate(
    @Body() createCryptocurrencyDto: CreateCryptocurrencyDto,
  ): Promise<Cryptocurrency> {
    return await this.cryptocurrencyService.create(createCryptocurrencyDto);
  }

  @Get()
  @ApiOperation({ summary: '암호화폐 조회' })
  async cryptocurrencyInquiry(): Promise<PaginatedResponse<Cryptocurrency>> {
    return await this.cryptocurrencyService.findAll();
  }
}
