import { BaseEntity } from 'src/core';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'exchange' })
export class Exchange extends BaseEntity<Exchange> {
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
}
