import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Gacha {
  @PrimaryColumn()
  equipment_id: number;

  @Column({
    default: 0,
  })
  rate: number;
}
