import { Column, Entity, Index } from 'typeorm';
import { BaseModel } from 'src/common/entity/base.entity';

@Entity()
export class UserMail extends BaseModel {
  @Column({
    nullable: false,
    type: 'char',
    length: 10,
  })
  @Index({ unique: false })
  user_id: string;

  @Column({
    type: 'varchar',
    length: 256,
    default: '',
  })
  send_type: string;

  @Column({
    default: '',
    type: 'varchar',
    length: 512,
  })
  image_text: string;

  @Column({
    default: '',
    type: 'varchar',
    length: 256,
  })
  mail_title: string;

  @Column({
    type: 'text',
    default: '',
  })
  mail_text: string;

  @Column({
    default: 0,
  })
  reward_id: number;

  @Column({
    type: 'char',
    length: 1,
    default: 'N',
  })
  reward_yn: string;

  @Column({
    type: 'datetime',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => new Date(value),
    },
    default: () => 'CURRENT_TIMESTAMP',
  })
  deadline: Date;
}
