import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class DispatchEquipLevel {
  @PrimaryColumn()
  id: number;

  @Column({
    default: 0,
  })
  equip_level: number;

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
