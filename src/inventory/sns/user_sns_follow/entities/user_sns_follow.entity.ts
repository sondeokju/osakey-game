import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class UserSnsFollow extends BaseModel {
  @Column({
    default: 0,
  })
  @Index({ unique: false })
  user_id: number;

  @Column({
    default: 0,
  })
  @Index({ unique: false })
  follow_user_id: number;

  @Column({
    default: 'N',
  })
  follow_yn: string;
}
