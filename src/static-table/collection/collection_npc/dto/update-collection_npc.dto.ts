import { PartialType } from '@nestjs/mapped-types';
import { CreateCollectionNpcDto } from './create-collection_npc.dto';

export class UpdateCollectionNpcDto extends PartialType(CreateCollectionNpcDto) {}
