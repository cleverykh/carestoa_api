import { EMAIL_TYPE } from 'src/common';
import { BaseEntity } from 'src/core';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'email_authentication' })
export class EmailSendHistory extends BaseEntity<EmailSendHistory> {
  @Column({
    type: 'varchar',
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  emailType: EMAIL_TYPE;

  @Column({
    type: 'varchar',
  })
  authenticationNumber: string;

  @Column({
    type: 'bigint',
    name: 'email_sending_timestamp_unix',
    unsigned: true,
    nullable: false,
  })
  emailSendingTimestampUnix: number;
}
