import { EXCHANGE_CODE } from 'src/common';
import { BaseEntity } from 'src/core';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'user_exchange_mapper' })
export class UserExchangeMapper extends BaseEntity<UserExchangeMapper> {
  @Column({
    type: 'int',
    name: 'USER_NO',
  })
  userNo: number;

  @Column({
    type: 'varchar',
    name: 'EXCHANGE_CODE',
  })
  exchangeCode: EXCHANGE_CODE;
}
