import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class UserSnsLevel extends BaseModel {
  @Column({
    nullable: false,
    type: 'char',
    length: 10,
  })
  @Index({ unique: false })
  user_id: string;

  @Column({
    default: 1,
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
    default: 'N',
  })
  reward_yn: string;
}
