import { PickType } from '@nestjs/mapped-types';
import { UsersModel } from 'src/users/entity/users.entity';

export class TakeMoneyDto extends PickType(UsersModel, [
  'gord',
  'exp',
  'battery',
  'diamond_paid',
  'diamond_free',
  'revive_coin',
]) {}
