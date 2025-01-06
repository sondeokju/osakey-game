import { Controller } from '@nestjs/common';
import { CollectionNpcService } from './collection_npc.service';

@Controller('server-config')
export class CollectionNpcController {
  constructor(private readonly collectionNpcService: CollectionNpcService) {}
}
