import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class EduCurriculum {
  @PrimaryColumn()
  id: number;

  @Column({
    default: 0,
  })
  curriculum_id: number;

  @Column({
    default: 0,
  })
  curriculum_level: number;

  @Column({
    default: 0,
  })
  edu_time: number;

  @Column({
    default: 0,
  })
  price1_item_id: number;

  @Column({
    default: 0,
  })
  price1_item_qty: number;

  @Column({
    default: 0,
  })
  price2_item_id: number;

  @Column({
    default: 0,
  })
  price2_item_qty: number;
}
