import { Column, Entity, Index } from 'typeorm';
import { BaseModel } from 'src/common/entity/base.entity';

@Entity()
//@Index('IDX_user_mail_id_user_id', ['id', 'user_id'], { unique: true }) // 복합 인덱스 설정
export class UserNpcFriendship extends BaseModel {
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
  @Index({ unique: false })
  npc_id: number;

  @Column({
    default: 0,
  })
  npc_likeability: number;

  @Column({
    type: 'varchar',
    length: 1,
    default: 0,
  })
  reward_yn: string;
}
