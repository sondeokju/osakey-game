import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Mission {
  @PrimaryColumn()
  mission_id: number;

  @Column({
    default: 0,
  })
  category_id: string;
}
