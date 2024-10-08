import { CONTRACT_STATUS, CRYPTOCURRENCY_SYMBOL, FLAG_YN } from 'src/common';
import { BaseEntity } from 'src/core';
import { ContractExchangeMapper } from 'src/modules/contract_exchange_mapper/contract_exchange_mapper.entity';
import { Cryptocurrency } from 'src/modules/cryptocurrency/entities/cryptocurrency.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ContractAmountHistory } from './contract-amount-history.entity';

@Entity({ name: 'contract' })
export class Contract extends BaseEntity<Contract> {
  @Column({
    type: 'datetime',
    name: 'join_date',
    nullable: true,
    default: null,
  })
  joinDate: Date;

  @Column({
    type: 'varchar',
    name: 'contract_status',
    default: CONTRACT_STATUS.PREPARATION,
  })
  contractStatus: CONTRACT_STATUS;

  @Column({
    type: 'int',
    name: 'user_no',
    unsigned: true,
  })
  userNo: number;

  @Column({
    type: 'int',
    name: 'product_no',
    unsigned: true,
    nullable: true,
    default: null,
  })
  productNo: number;

  @Column({
    type: 'varchar',
    name: 'cryptocurrency_symbol',
    nullable: true,
    default: null,
  })
  cryptocurrencySymbol: CRYPTOCURRENCY_SYMBOL;

  @Column({
    type: 'datetime',
    name: 'contract_start_date',
    nullable: true,
    default: null,
  })
  contractStartDate: Date;

  @Column({
    type: 'datetime',
    name: 'contract_end_date',
    nullable: true,
    default: null,
  })
  contractEndDate: Date;

  @Column({
    type: 'decimal',
    precision: 27,
    scale: 18,
    nullable: true,
  })
  compensation: number;

  @Column({
    type: 'varchar',
    name: 'product_agreement',
    default: FLAG_YN.NO,
  })
  productAgreement: FLAG_YN;

  @Column({
    type: 'text',
    default: null,
  })
  sign: string;

  @ManyToOne((type) => User, (user) => user.contracts)
  @JoinColumn({
    name: 'user_no',
    referencedColumnName: 'no',
  })
  user: User;

  @ManyToOne((type) => Product, (product) => product.contracts)
  @JoinColumn({
    name: 'product_no',
    referencedColumnName: 'no',
  })
  product: Product;

  @ManyToOne(
    (type) => Cryptocurrency,
    (cryptocurrency) => cryptocurrency.contracts,
  )
  @JoinColumn({
    name: 'cryptocurrency_symbol',
    referencedColumnName: 'symbol',
  })
  cryptocurrency: Cryptocurrency;

  @OneToMany(
    (type) => ContractExchangeMapper,
    (contractExchangeMapper) => contractExchangeMapper.contract,
    { cascade: true },
  )
  contractExchangeMappers: ContractExchangeMapper[];

  @OneToMany(
    (type) => ContractAmountHistory,
    (contractAmountHistory) => contractAmountHistory.contract,
  )
  contractAmountHistories: ContractAmountHistory[];
}
