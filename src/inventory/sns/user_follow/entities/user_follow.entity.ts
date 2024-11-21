import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class UserFollow extends BaseModel {
  @Column({
    default: 0,
  })
  @Index({ unique: true })
  user_id: number;

  @Column({
    default: 0,
  })
  @Index({ unique: false })
  follow_user_id: number;
}
