import { Column, Entity, Index } from 'typeorm';
import { BaseModel } from 'src/common/entity/base.entity';

@Entity()
@Index('IDX_user_achievements_id_user_id', ['id', 'user_id'], { unique: true }) // 복합 인덱스 설정
export class UserAchievements extends BaseModel {
  @Column({
    nullable: false,
    type: 'char',
    length: 10,
  })
  @Index({ unique: false })
  user_id: string;

  @Column({
    default: 0,
  })
  achieve_id: number;

  @Column({
    default: 0,
  })
  achieve_count: number;

  @Column({
    type: 'char',
    length: 1,
    default: 'N',
  })
  progress_status: string;

  @Column({
    type: 'datetime',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => new Date(value),
    },
    default: () => 'CURRENT_TIMESTAMP',
  })
  complete_date: Date;

  @Column({
    type: 'char',
    length: 1,
    default: 'N',
  })
  reward_yn: string;
}
