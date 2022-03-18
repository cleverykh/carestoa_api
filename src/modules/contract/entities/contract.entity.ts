import { CONTRACT_STATUS } from 'src/common';
import { BaseEntity } from 'src/core';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'contract' })
export class Contract extends BaseEntity<Contract> {
  @Column({
    type: 'datetime',
    name: 'JOIN_DATE',
  })
  joinDate: Date;

  @Column({
    type: 'varchar',
    name: 'CONTRACT_STATUS',
    default: CONTRACT_STATUS.NORMAR,
  })
  contractStatus: CONTRACT_STATUS;

  @Column({
    type: 'int',
    name: 'USER_NO',
    unsigned: true,
  })
  userNo: number;

  @Column({
    type: 'int',
    name: 'PRODUCT_NO',
    unsigned: true,
  })
  productNo: number;

  @Column({
    type: 'datetime',
    name: 'CONTRACT_START_DATE',
  })
  contractStartDate: Date;

  @Column({
    type: 'datetime',
    name: 'CONTRACT_END_DATE',
  })
  contractEndDate: Date;

  @Column({
    type: 'varchar',
    name: 'CRYPTOCURRENCY_CODE',
  })
  cryptocurrencyCode: string;

  @Column({
    type: 'decimal',
    precision: 27,
    scale: 18,
    name: 'CONTRACT_AMOUNT',
  })
  contractAmount: number;

  @Column({
    type: 'varchar',
    name: 'DEPOSIT_ADDRESS',
  })
  depositAddress: string;

  @Column({
    type: 'datetime',
    name: 'DEPOSIT_VALID_DATE',
  })
  depositValidDate: Date;

  @Column({
    type: 'varchar',
    name: 'DESTINATION_TAG',
  })
  destinationTag: string;

  @Column({
    type: 'decimal',
    precision: 27,
    scale: 18,
    name: 'COMPENSATION',
  })
  compensation: number;

  @Column({
    type: 'varchar',
    name: 'SIGN',
  })
  sign: string;
}
