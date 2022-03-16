import { BaseEntity } from 'src/core';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'exchange' })
export class Exchange extends BaseEntity<Exchange> {
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
