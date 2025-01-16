import { Column, Entity, Index } from 'typeorm';
import { BaseModel } from 'src/common/entity/base.entity';

@Entity()
//@Exclude()
export class ZLoginLog extends BaseModel {
  @Column({
    length: 10,
    type: 'char',
  })
  @Index({ unique: false })
  user_id: string;

  @Column({
    length: 256,
    type: 'varchar',
    default: '',
  })
  @Index({ unique: false })
  member_id: string;

  @Column({
    length: 256,
    type: 'varchar',
    default: '',
  })
  sicail_type: string;
}
