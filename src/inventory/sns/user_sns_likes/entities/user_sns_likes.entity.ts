import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
@Index(['user_id', 'tuna_tv_id'], { unique: true })
export class UserSnsLikes extends BaseModel {
  @Column({
    nullable: false,
    type: 'char',
    length: 10,
  })
  @Index({ unique: false })
  user_id: string;

  @Column({
    type: 'bigint',
    default: 0,
  })
  tuna_tv_id: number;
}
