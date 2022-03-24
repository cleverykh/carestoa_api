import { CONTRACT_STATUS } from 'src/common';
import { BaseEntity } from 'src/core';
import { Cryptocurrency } from 'src/modules/cryptocurrency/entities/cryptocurrency.entity';
import { Exchange } from 'src/modules/exchange/entities/exchange.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity({ name: 'contract' })
export class Contract extends BaseEntity<Contract> {
  @Column({
    type: 'datetime',
    name: 'join_date',
    nullable: true,
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
    type: 'int',
    name: 'cryptocurrency_no',
    unsigned: true,
    nullable: true,
    default: null,
  })
  cryptocurrencyNo: number;

  @Column({
    type: 'datetime',
    name: 'contract_start_date',
  })
  contractStartDate: Date;

  @Column({
    type: 'datetime',
    name: 'contract_end_date',
  })
  contractEndDate: Date;

  @Column({
    type: 'decimal',
    name: 'contract_amount',
    precision: 27,
    scale: 18,
  })
  contractAmount: number;

  @Column({
    type: 'varchar',
    name: 'deposit_address',
  })
  depositAddress: string;

  @Column({
    type: 'datetime',
    name: 'deposit_valid_date',
  })
  depositValidDate: Date;

  @Column({
    type: 'varchar',
    name: 'destination_tag',
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

  @ManyToOne(() => User, (user) => user.contracts)
  user: User;

  @ManyToOne(() => Product, (product) => product.contracts)
  product: Product;

  @ManyToOne(() => Cryptocurrency, (cryptocurrency) => cryptocurrency.contracts)
  cryptocurrency: Cryptocurrency;

  @ManyToMany(() => Exchange)
  @JoinTable()
  exchanges: Exchange[];
}
