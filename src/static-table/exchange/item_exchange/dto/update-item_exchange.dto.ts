import { PartialType } from '@nestjs/mapped-types';
import { CreateItemExchangeDto } from './create-item_exchange.dto';

export class UpdateItemExchangeDto extends PartialType(CreateItemExchangeDto) {}
