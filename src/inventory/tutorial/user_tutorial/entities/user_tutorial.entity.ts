import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
// @Index('user_memory_user_id_boss_id', ['user_id', 'boss_id'], { unique: true })
@Index('UserTutorial_user_id_tutorial_id', ['user_id', 'tutorial_id'], {
  unique: false,
})
export class UserTutorial extends BaseModel {
  @Column({
    nullable: false,
    type: 'char',
    length: 10,
  })
  @Index({ unique: false })
  user_id: string;

  @Column({
    default: '0',
  })
  @Index({ unique: false })
  tutorial_sub_id: number;

  @Column({
    default: '0',
  })
  @Index({ unique: false })
  tutorial_id: number;

  @Column({
    type: 'char',
    length: 1,
    default: 'N',
  })
  reward_yn: string;
}
