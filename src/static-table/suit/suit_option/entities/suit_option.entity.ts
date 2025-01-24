import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class SuitOption {
  @PrimaryColumn()
  id: number;

  @Column({
    default: 0,
  })
  suit_id: number;

  @Column({
    default: 0,
  })
  suit_option_number: number;

  @Column({
    default: 0,
  })
  unlock_level: number;

  @Column({
    type: 'varchar',
    length: 10,
    default: '',
  })
  option_is_global: string;

  @Column({
    type: 'varchar',
    length: 10,
    default: '',
  })
  option_type: string;

  @Column({
    default: 0,
  })
  option_value: number;
}
