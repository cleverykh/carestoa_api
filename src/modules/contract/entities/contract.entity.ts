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
  })
  joinDate: Date;

  @Column({
    type: 'varchar',
    default: CONTRACT_STATUS.PREPARATION,
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
    type: 'int',
    unsigned: true,
  })
  cryptocurrencyNo: number;

  @Column({
    type: 'datetime',
  })
  contractStartDate: Date;

  @Column({
    type: 'datetime',
  })
  contractEndDate: Date;

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
