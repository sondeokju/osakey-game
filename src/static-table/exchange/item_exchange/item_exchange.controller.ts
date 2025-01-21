import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemExchangeService } from './item_exchange.service';

@Controller('item-exchange')
export class ItemExchangeController {
  constructor(private readonly itemExchangeService: ItemExchangeService) {}
}
