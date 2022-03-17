import { Module } from '@nestjs/common';
import { CryptocurrencyService } from './cryptocurrency.service';
import { CryptocurrencyController } from './cryptocurrency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cryptocurrency } from './entities/cryptocurrency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cryptocurrency])],
  controllers: [CryptocurrencyController],
  providers: [CryptocurrencyService],
})
export class CryptocurrencyModule {}
