import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Skill {
  @PrimaryColumn()
  skill_id: number;

  @Column({
    type: 'varchar',
    length: 30,
    default: '',
  })
  skill_equip_category: string;

  @Column({
    type: 'double',
    default: 0.0,
  })
  skill_equip_rate: number;
}
