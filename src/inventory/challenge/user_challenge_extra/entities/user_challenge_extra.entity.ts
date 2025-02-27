import { Column, Entity, Index } from 'typeorm';
import { BaseModel } from 'src/common/entity/base.entity';

@Entity()
// @Index(
//   'IDX_UserChallenge_user_idmission_routine_id_',
//   ['user_id', 'mission_routine_id'],
//   {
//     unique: false,
//   },
// ) // 복합 인덱스 설정
export class UserChallengeExtra extends BaseModel {
  @Column({
    nullable: false,
    type: 'char',
    length: 10,
  })
  @Index({ unique: false })
  user_id: string;

  @Column({
    type: 'varchar',
    length: 10,
    default: '',
  })
  mission_kind: string;

  @Column({
    default: 0,
  })
  complete_count: number;

  @Column({
    type: 'char',
    length: 1,
    default: 'N',
  })
  reward_yn: string;
}
