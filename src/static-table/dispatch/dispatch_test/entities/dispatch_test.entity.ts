import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class DispatchTest {
  @PrimaryColumn()
  id: number;

  @Column({
    default: 0,
  })
  time: number;

  @Column({
    default: 0,
  })
  success: number;

  @Column({
    default: 0,
  })
  tama_success: number;
}
