import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
@Index(['user_id', 'tuna_tv_id'], { unique: true })
export class SnsLikes extends BaseModel {
  @Column({
    default: 0,
  })
  user_id: number;

  @Column({
    type: 'bigint',
    default: 0,
  })
  tuna_tv_id: number;

  @Column({
    default: 0,
  })
  total_exp: number;

  @Column({
    default: 0,
  })
  reward_id: number;
}
