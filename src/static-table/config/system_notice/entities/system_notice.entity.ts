import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class SystemNotice extends BaseModel {
  @PrimaryColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 512,
    default: 0,
  })
  notice_title: string;

  @Column({
    type: 'text',
    length: '',
    default: 0,
  })
  notice_text: string;

  @Column({
    type: 'datetime',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => new Date(value),
    },
    default: () => 'CURRENT_TIMESTAMP',
  })
  start_date: Date;

  @Column({
    type: 'datetime',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => new Date(value),
    },
    default: () => 'CURRENT_TIMESTAMP',
  })
  end_date: Date;
}
