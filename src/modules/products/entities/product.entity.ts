import { CRYPTOCURRENCY_SYMBOL, PRODUCT_STATUS } from 'src/common';
import { BaseEntity } from 'src/core';
import { Contract } from 'src/modules/contract/entities/contract.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'product' })
export class Product extends BaseEntity<Product> {
  @Column({
    type: 'varchar',
    default: PRODUCT_STATUS.RECRUITMENT,
  })
  status: PRODUCT_STATUS;

  @Column({
    type: 'varchar',
    unique: true,
  })
  name: string;

  @Column({
    type: 'decimal',
    name: 'product_fee',
    precision: 27,
    scale: 18,
    nullable: true,
  })
  productFee: number;

  @Column({
    type: 'varchar',
  })
  symbol: CRYPTOCURRENCY_SYMBOL;

  @OneToMany((type) => Contract, (contract) => contract.product)
  contracts: Contract[];
}
