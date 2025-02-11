import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

//CREATE INDEX idx_user_item ON user_item(user_id, item_id, item_level);

@Entity()
export class UserItem extends BaseModel {
  @Column({
    nullable: false,
    type: 'char',
    length: 10,
  })
  @Index({ unique: false })
  user_id: string;

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
