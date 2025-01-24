import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
// @Index('user_memory_user_id_boss_id', ['user_id', 'boss_id'], { unique: true })
// @Index('user_memory_boss_id_memory', ['boss_id', 'memory'], { unique: false })
export class UserMemoryShare extends BaseModel {
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
  boss_id: number;

  @Column({
    type: 'char',
    length: 1,
    default: 'N',
  })
  memory_id: number;

  @Column({
    type: 'char',
    length: 1,
    default: 'N',
  })
  memory_rent_yn: string;

  @Column({
    type: 'datetime',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => new Date(value),
    },
    default: () => 'CURRENT_TIMESTAMP',
  })
  memorise_rent_start_date: Date;
}
