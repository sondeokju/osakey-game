import { Column, Entity, Index } from 'typeorm';
import { BaseModel } from 'src/common/entity/base.entity';

@Entity()
//@Index('IDX_user_achievements_id_user_id', ['id', 'user_id'], { unique: true }) // 복합 인덱스 설정
export class UserOfflineReward extends BaseModel {
  @Column({
    nullable: false,
    type: 'char',
    length: 10,
  })
  @Index({ unique: false })
  user_id: string;

  @Column({
    type: 'datetime',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => new Date(value),
    },
    default: () => 'CURRENT_TIMESTAMP',
  })
  last_reward_date: Date;

  @Column({
    type: 'datetime',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => new Date(value),
    },
    default: () => 'CURRENT_TIMESTAMP',
  })
  last_ad_date: Date;

  @Column({
    default: 0,
  })
  ad_reward_count: number;
}
