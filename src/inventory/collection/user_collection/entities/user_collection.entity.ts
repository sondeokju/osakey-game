import { Column, Entity, Index } from 'typeorm';
import { BaseModel } from 'src/common/entity/base.entity';

@Entity()
//@Index('IDX_user_mail_id_user_id', ['id', 'user_id'], { unique: true }) // 복합 인덱스 설정
export class UserCollection extends BaseModel {
  @Column({
    nullable: false,
    type: 'char',
    length: 10,
  })
  @Index({ unique: false })
  user_id: string;

  @Column({
    type: 'varchar',
    length: 128,
    default: '',
  })
  collection_type: string;

  @Column({
    default: 0,
  })
  collection_id: number;

  @Column({
    type: 'char',
    length: 1,
    default: 'N',
  })
  collection_yn: string;

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
  collection_enable_date: Date;

  @Column({
    type: 'datetime',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => new Date(value),
    },
    default: () => 'CURRENT_TIMESTAMP',
  })
  reward_date: Date;
}
