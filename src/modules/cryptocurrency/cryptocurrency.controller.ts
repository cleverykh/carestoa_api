import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginatedResponse } from 'src/common';
import { CryptocurrencyService } from './cryptocurrency.service';
import { CreateCryptocurrencyDto } from './dto/create-cryptocurrency.dto';
import { Cryptocurrency } from './entities/cryptocurrency.entity';

@ApiTags('CRYPTOCURRENCY')
@Controller('cryptocurrency')
export class CryptocurrencyController {
  constructor(private readonly cryptocurrencyService: CryptocurrencyService) {}

  @Post()
  async cryptocurrencyCreate(
    @Body() createCryptocurrencyDto: CreateCryptocurrencyDto,
  ): Promise<Cryptocurrency> {
    return await this.cryptocurrencyService.create(createCryptocurrencyDto);
  }

  @Get()
  async cryptocurrencyInquiry(): Promise<PaginatedResponse<Cryptocurrency>> {
    return await this.cryptocurrencyService.findAll();
  }
}
