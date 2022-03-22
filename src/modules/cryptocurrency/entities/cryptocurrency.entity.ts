import { BaseEntity } from 'src/core';
import { Column, Entity } from 'typeorm';

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
}
