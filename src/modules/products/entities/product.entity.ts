import { PRODUCT_STATUS } from 'src/common';
import { BaseEntity } from 'src/core';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'product' })
export class Product extends BaseEntity<Product> {
  @Column({
    type: 'varchar',
  })
  status: PRODUCT_STATUS;

  @Column({
    type: 'varchar',
    unique: true,
  })
  name: string;
}
