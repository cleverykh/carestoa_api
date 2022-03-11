import {
  BaseEntity as TypeormBaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseDto } from './base.dto';

export class BaseEntity<T> extends TypeormBaseEntity {
  // [x: string]: any;

  constructor(partial?: Partial<T>) {
    super();
    partial &&
      Object.keys(partial).map((key) => {
        // if (key !== 'no' && this.hasOwnProperty(key)) {
        if (key !== 'no' && partial[key] !== undefined) {
          this[key] = partial[key];
        }
      });
  }

  set(partial: Object, deep: boolean = false): this {
    partial &&
      Object.keys(partial).map((key) => {
        // if (key !== 'no' && this.hasOwnProperty(key)) {
        if (partial[key] !== undefined) {
          if (deep) {
            this[key] = partial[key];
          } else {
            if (!(partial[key] instanceof BaseDto)) {
              this[key] = partial[key];
            }
          }
        }
        // }
      });
    return this;
  }

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'NO',
    unsigned: true,
  })
  no: number;

  @CreateDateColumn({
    type: 'datetime',
    name: 'CREATE_DATE',
    nullable: true,
  })
  createDate: Date;

  @UpdateDateColumn({
    type: 'datetime',
    name: 'UPDATE_DATE',
    nullable: true,
  })
  updateDate: Date;
}
