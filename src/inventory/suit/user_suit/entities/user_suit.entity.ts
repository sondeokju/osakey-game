import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
// @Index('user_memory_user_id_boss_id', ['user_id', 'boss_id'], { unique: true })
// @Index('user_memory_boss_id_memory', ['boss_id', 'memory'], { unique: false })
export class UserSuit extends BaseModel {
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
  suit_id: number;

  @Column({
    default: '1',
  })
  @Index({ unique: false })
  suit_level: number;

  @Column({
    default: '1',
  })
  @Index({ unique: false })
  suit_special_level: number;

  @Column({
    type: 'char',
    length: 1,
    default: 'N',
  })
  unlock_yn: string;

  @Column({
    type: 'char',
    length: 1,
    default: 'N',
  })
  mount_yn: string;
}
