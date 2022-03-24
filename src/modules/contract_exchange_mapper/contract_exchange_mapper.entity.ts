import { BaseEntity } from 'src/core';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Contract } from '../contract/entities/contract.entity';
import { Exchange } from '../exchange/entities/exchange.entity';

@Entity('contract_exchange_mapper')
export class ContractExchangeMapper extends BaseEntity<ContractExchangeMapper> {
  @Column({
    type: 'int',
    name: 'contract_no',
    unsigned: true,
  })
  contractNo: number;

  @Column({
    type: 'int',
    name: 'exchange_no',
    unsigned: true,
  })
  exchangeNo: number;

  @ManyToOne(() => Contract, (contract) => contract.contractExchangeMapper)
  @JoinColumn({
    name: 'contract_no',
    referencedColumnName: 'no',
  })
  public contract: Contract;

  @ManyToOne(() => Exchange, (exchange) => exchange.contractExchangeMapper)
  @JoinColumn({
    name: 'exchange_no',
    referencedColumnName: 'no',
  })
  public exchange: Exchange;
}
