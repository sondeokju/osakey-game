import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class EquipGrade {
  @PrimaryColumn()
  id: number;

  @Column({
    default: '',
    type: 'varchar',
    length: 30,
  })
  equip_grade_name: string;

  @Column({
    default: '',
    type: 'varchar',
    length: 10,
  })
  equip_skill_unlock: string;

  @Column({
    default: '',
    type: 'varchar',
    length: 10,
  })
  equip_grade_max: string;
}
