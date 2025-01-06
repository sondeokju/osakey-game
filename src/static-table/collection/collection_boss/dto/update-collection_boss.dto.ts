import { PartialType } from '@nestjs/mapped-types';
import { CreateCollectionBossDto } from './create-collection_boss.dto';

export class UpdateCollectionBossDto extends PartialType(CreateCollectionBossDto) {}
