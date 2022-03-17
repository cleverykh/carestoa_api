import { BaseEntity } from 'src/core';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'cryptocurrency' })
export class Cryptocurrency extends BaseEntity<Cryptocurrency> {
  @Column({
    type: 'varchar',
    name: 'NAME',
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    name: 'CODE',
    unique: true,
  })
  code: string;
}
