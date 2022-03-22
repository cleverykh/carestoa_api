import {
  BaseEntity as TypeormBaseEntity,
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
    unsigned: true,
  })
  no: number;

  @CreateDateColumn({
    type: 'datetime',
    nullable: true,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    nullable: true,
  })
  updatedAt: Date;
}
