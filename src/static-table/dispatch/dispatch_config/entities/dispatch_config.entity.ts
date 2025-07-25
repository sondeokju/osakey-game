import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class DispatchConfig {
  @PrimaryColumn()
  id: number;

  @Column({
    default: '',
  })
  config_type: string;

  @Column({
    default: '',
  })
  config_desc: string;

  @Column({
    default: 0,
  })
  option: number;
}
