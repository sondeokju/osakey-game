import { Controller } from '@nestjs/common';
import { CollectionBossMemoryService } from './collection_boss_memory.service';

@Controller('server-config')
export class CollectionBossController {
  constructor(
    private readonly collectionBossMemoryService: CollectionBossMemoryService,
  ) {}
}
