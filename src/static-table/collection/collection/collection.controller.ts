import { Controller } from '@nestjs/common';
import { CollectionService } from './collection.service';

@Controller('server-config')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}
}
