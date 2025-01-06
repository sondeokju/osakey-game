import { Controller } from '@nestjs/common';
import { CollectionSuitService } from './collection_suit.service';

@Controller('server-config')
export class CollectionSuitController {
  constructor(private readonly collectionSuitService: CollectionSuitService) {}
}
