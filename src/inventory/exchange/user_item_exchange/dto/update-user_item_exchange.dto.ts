import { PartialType } from '@nestjs/mapped-types';
import { CreateUserItemExchangeDto } from './create-user_item_exchange.dto';

export class UpdateUserItemExchangeDto extends PartialType(CreateUserItemExchangeDto) {}
