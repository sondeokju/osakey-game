import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class UserAd extends BaseModel {
  @Column({
    unique: true,
    default: 0,
  })
  user_id: number;

  @Column({
    default: 0,
  })
  @Index()
  reset_id: number;

  @Column({
    default: 0,
  })
  count: number;
}
