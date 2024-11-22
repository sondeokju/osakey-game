import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class UserTunaTvOnline extends BaseModel {
  @Column({
    default: 0,
  })
  @Index({ unique: true })
  tuna_tv_id: number;
}
