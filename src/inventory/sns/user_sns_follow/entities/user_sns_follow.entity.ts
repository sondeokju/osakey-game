import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
@Index(
  'user_sns_follow_user_id_follow_user_id',
  ['user_id', 'follow_user_id'],
  {
    unique: false,
  },
)
export class UserSnsFollow extends BaseModel {
  @Column({
    nullable: false,
    type: 'char',
    length: 10,
  })
  @Index({ unique: false })
  user_id: string;

  @Column({
    nullable: false,
    type: 'char',
    length: 10,
  })
  @Index({ unique: false })
  follow_user_id: string;

  @Column({
    default: 'N',
  })
  @Index({ unique: false })
  follow_yn: string;
}
