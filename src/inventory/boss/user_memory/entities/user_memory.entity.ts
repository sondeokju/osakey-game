import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
@Index('user_memory_user_id_boss_id', ['user_id', 'boss_id'], { unique: true })
@Index('user_memory_boss_id_memory', ['boss_id', 'memory'], { unique: false })
export class UserMemory extends BaseModel {
  @Column({
    default: 0,
  })
  @Index({ unique: false })
  user_id: number;

  @Column({
    default: '0',
  })
  @Index({ unique: false })
  boss_id: number;

  @Column({
    default: '0',
  })
  memory: number;
}
