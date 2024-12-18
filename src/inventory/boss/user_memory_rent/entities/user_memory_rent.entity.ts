import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
//@Index('user_memory_user_id_memory', ['user_id', 'boss_id'], { unique: true })
export class UserMemoryRent extends BaseModel {
  @Column({
    nullable: false,
    type: 'char',
    length: 10,
  })
  @Index({ unique: false })
  user_id: string;

  @Column({
    type: 'char',
    length: 10,
    default: '',
  })
  rent_memory_user_1: string;

  @Column({
    default: '0',
  })
  rent_boss_1: number;

  @Column({
    type: 'char',
    length: 10,
    default: '',
  })
  rent_memory_user_2: string;

  @Column({
    default: '0',
  })
  rent_boss_2: number;

  @Column({
    type: 'char',
    length: 10,
    default: '',
  })
  rent_memory_user_3: string;

  @Column({
    default: '0',
  })
  rent_boss_3: number;
}
