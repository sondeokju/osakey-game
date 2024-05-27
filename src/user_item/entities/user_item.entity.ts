import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class UserItem extends BaseModel {
  @Column({
    default: 0,
  })
  user_id: number;

  @Column({
    default: 0,
  })
  item_id: number;

  @Column({
    default: 0,
  })
  item_level: number;

  @Column({})
  item_type: string;

  @Column({
    default: 0,
  })
  item_count: number;
}
