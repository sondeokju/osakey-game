import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class UserSnsLevel extends BaseModel {
  @Column({
    default: 0,
  })
  @Index({ unique: true })
  user_id: number;

  @Column({
    default: 0,
  })
  sns_level: number;

  @Column({
    default: 0,
  })
  sns_exp: number;

  @Column({
    default: 0,
  })
  sns_reward_id: number;

  @Column({
    default: '',
  })
  reward_yn: string;
}
