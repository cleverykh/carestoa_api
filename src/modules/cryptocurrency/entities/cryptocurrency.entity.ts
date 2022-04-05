import { BaseEntity } from 'src/core';
import { Contract } from 'src/modules/contract/entities/contract.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'cryptocurrency' })
export class Cryptocurrency extends BaseEntity<Cryptocurrency> {
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

  @Column({
    type: 'varchar',
    name: 'deposit_address',
    nullable: true,
    default: null,
  })
  depositAddress: string;

  @OneToMany((type) => Contract, (contract) => contract.cryptocurrency)
  contracts: Contract[];
}
