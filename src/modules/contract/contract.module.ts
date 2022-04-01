import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './entities/contract.entity';
import { User } from '../users/entities/user.entity';
import { CallHttpService } from 'src/core';
import { HttpModule } from '@nestjs/axios';
import { ContractExchangeMapper } from '../contract_exchange_mapper/contract_exchange_mapper.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Contract, User, ContractExchangeMapper]),
    HttpModule,
  ],
  controllers: [ContractController],
  providers: [ContractService, CallHttpService],
})
export class ContractModule {}
