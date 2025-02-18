import { PartialType } from '@nestjs/mapped-types';
import { CreateUserShopLimitDto } from './create-user_shop_limit.dto';

export class UpdateUserShopLimitDto extends PartialType(CreateUserShopLimitDto) {}
