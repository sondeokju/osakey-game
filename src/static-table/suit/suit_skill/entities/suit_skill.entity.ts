import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class SuitSkill {
  @PrimaryColumn()
  id: number;

  @Column({
    default: 0,
  })
  suit_info_id: number;

  @Column({
    default: 0,
  })
  unlock_level: number;

  @Column({
    default: 0,
  })
  is_passive: number;

  @Column({
    default: 0,
  })
  skill_id: number;
}
