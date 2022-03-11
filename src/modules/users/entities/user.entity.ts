import { BaseEntity } from 'src/core/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class User extends BaseEntity<User> {
  @Column({
    type: 'varchar',
    name: 'EMAIL',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    name: 'PASSWORD',
    nullable: false,
    unique: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    name: 'USER_NAME',
    nullable: false,
    unique: false,
  })
  userName: string;

  @Column({
    type: 'varchar',
    name: 'RESIDENT_REGISTRATION_NUMBER',
    nullable: true,
    unique: false,
  })
  residentRegistrationNumber: string;

  @Column({
    type: 'varchar',
    name: 'PHONE_NUMBER',
    nullable: true,
    unique: false,
  })
  phoneNumber: string;
}
