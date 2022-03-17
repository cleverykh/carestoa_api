import { PRODUCT_STATUS } from 'src/common';
import { BaseEntity } from 'src/core';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'product' })
export class Product extends BaseEntity<Product> {
  @Column({
    type: 'varchar',
    name: 'STATUS',
  })
  status: PRODUCT_STATUS;

  @Column({
    type: 'varchar',
    name: 'NAME',
    unique: true,
  })
  name: string;
}
