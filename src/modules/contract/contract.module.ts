import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './entities/contract.entity';
import { User } from '../users/entities/user.entity';
import { CallHttpService } from 'src/core';
import { HttpModule } from '@nestjs/axios';
import { ContractExchangeMapper } from '../contract_exchange_mapper/contract_exchange_mapper.entity';
import { ContractAmountHistory } from './entities/contract-amount-history.entity';
import { Cryptocurrency } from '../cryptocurrency/entities/cryptocurrency.entity';
import { RemittanceCheckTaskService } from './remittance-check.task.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Contract,
      User,
      ContractExchangeMapper,
      ContractAmountHistory,
      Cryptocurrency,
    ]),
    HttpModule,
  ],
  controllers: [ContractController],
  providers: [ContractService, CallHttpService, RemittanceCheckTaskService],
})
export class ContractModule {}
