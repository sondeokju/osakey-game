import { Column, Entity, Index } from 'typeorm';
import { BaseModel } from 'src/common/entity/base.entity';

@Entity()
//@Index('IDX_user_mail_id_user_id', ['id', 'user_id'], { unique: true }) // 복합 인덱스 설정
export class UserIngameReward extends BaseModel {
  @Column({
    nullable: false,
    type: 'char',
    length: 10,
  })
  @Index({ unique: false })
  user_id: string;

  @Column({
    type: 'varchar',
    length: 30,
    default: '',
  })
  game_mode: string;

  @Column({
    default: 0,
  })
  stage_id: number;

  @Column({
    type: 'char',
    length: 1,
    default: 'N',
  })
  stage_clear_yn: string;

  @Column({
    type: 'varchar',
    length: 30,
    default: '',
  })
  rank: string;

  @Column({
    type: 'char',
    length: 1,
    default: 'N',
  })
  first_clear_yn: string;

  @Column({
    default: 0,
  })
  reward_id: number;

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
