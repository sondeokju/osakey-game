import { PartialType } from '@nestjs/mapped-types';
import { CreateCollectionBossMemoryDto } from './create-collection_boss_memory.dto';

export class UpdateCollectionBossMemoryDto extends PartialType(CreateCollectionBossMemoryDto) {}
