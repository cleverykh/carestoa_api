import { BaseEntity } from 'src/core';
import { Contract } from 'src/modules/contract/entities/contract.entity';
import { ContractExchangeMapper } from 'src/modules/contract_exchange_mapper/contract_exchange_mapper.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'exchange' })
export class Exchange extends BaseEntity<Exchange> {
  @Column({
    type: 'varchar',
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  code: string;

  contracts: Contract[];

  @OneToMany(
    (type) => ContractExchangeMapper,
    (contractExchangeMapper) => contractExchangeMapper.exchange,
  )
  contractExchangeMappers: ContractExchangeMapper[];
}
