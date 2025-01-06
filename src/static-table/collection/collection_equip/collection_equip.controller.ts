import { Controller } from '@nestjs/common';
import { CollectionEquipService } from './collection_equip.service';

@Controller('server-config')
export class CollectionEquipController {
  constructor(
    private readonly collectionEquipService: CollectionEquipService,
  ) {}
}
