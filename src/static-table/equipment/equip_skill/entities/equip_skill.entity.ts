import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class EquipSkill {
  @PrimaryColumn()
  equip_skill_id: number;

  @Column({
    default: 0,
  })
  price_gord: number;

  @Column({
    default: 0,
  })
  price_dia: number;

  @Column({
    default: 0,
  })
  price_item_id: number;

  @Column({
    default: 0,
  })
  price_item_qty: number;

  @Column({
    default: '',
    type: 'varchar',
    length: 10,
  })
  is_max_price: string;
}
