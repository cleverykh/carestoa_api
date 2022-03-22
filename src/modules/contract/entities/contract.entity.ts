import { CONTRACT_STATUS } from 'src/common';
import { BaseEntity } from 'src/core';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'contract' })
export class Contract extends BaseEntity<Contract> {
  @Column({
    type: 'datetime',
  })
  joinDate: Date;

  @Column({
    type: 'varchar',
    default: CONTRACT_STATUS.NORMAR,
  })
  contractStatus: CONTRACT_STATUS;

  @Column({
    type: 'int',
    unsigned: true,
  })
  userNo: number;

  @Column({
    type: 'int',
    unsigned: true,
  })
  productNo: number;

  @Column({
    type: 'datetime',
  })
  contractStartDate: Date;

  @Column({
    type: 'datetime',
  })
  contractEndDate: Date;

  @Column({
    type: 'varchar',
  })
  cryptocurrencyCode: string;

  @Column({
    type: 'decimal',
    precision: 27,
    scale: 18,
  })
  contractAmount: number;

  @Column({
    type: 'varchar',
  })
  depositAddress: string;

  @Column({
    type: 'datetime',
  })
  depositValidDate: Date;

  @Column({
    type: 'varchar',
  })
  destinationTag: string;

  @Column({
    type: 'decimal',
    precision: 27,
    scale: 18,
  })
  compensation: number;

  @Column({
    type: 'varchar',
  })
  sign: string;
}
