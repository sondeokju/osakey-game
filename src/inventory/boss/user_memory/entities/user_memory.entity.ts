import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
@Index('user_memory_user_id_memory', ['user_id', 'boss_id'], { unique: true })
export class UserMemory extends BaseModel {
  @Column({
    default: 0,
  })
  @Index({ unique: true })
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
