import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class UserTunaTvOnline extends BaseModel {
  @Column({
    default: 0,
  })
  @Index({ unique: false })
  tuna_tv_id: number;

  @Column({
    default: '',
  })
  online_type: string;
}
