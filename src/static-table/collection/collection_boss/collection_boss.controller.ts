import { Controller } from '@nestjs/common';
import { CollectionBossService } from './collection_boss.service';

@Controller('server-config')
export class CollectionBossController {
  constructor(private readonly collectionBossService: CollectionBossService) {}
}
