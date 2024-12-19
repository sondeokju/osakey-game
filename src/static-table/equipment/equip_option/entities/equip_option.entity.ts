import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class EquipOption {
  @PrimaryColumn()
  id: number;

  @Column({
    default: 0,
  })
  origin_equip_id: number;

  @Column({
    default: 0,
  })
  option_grade: number;

  @Column({
    default: '',
    type: 'varchar',
    length: 30,
  })
  option_type: string;

  @Column({
    default: 0.0,
    type: 'double',
  })
  option_value: number;
}
