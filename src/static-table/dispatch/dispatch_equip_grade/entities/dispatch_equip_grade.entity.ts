import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class DispatchEquipGrade {
  @PrimaryColumn()
  id: number;

  @Column({
    default: '',
  })
  equip_grade: string;

  @Column({
    type: 'float',
    default: 0.0,
  })
  add_success_rate: number;

  @Column({
    type: 'float',
    default: 0.0,
  })
  add_great_success_rate: number;
}
