import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class SuitSkill {
  @PrimaryColumn()
  id: number;

  @Column({
    default: 0,
  })
  suit_id: number;

  @Column({
    default: 0,
  })
  unlock_level: number;

  @Column({
    type: 'varchar',
    length: 10,
    default: '',
  })
  is_passive: string;

  @Column({
    default: 0,
  })
  skill_id: number;
}
