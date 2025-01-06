import { PartialType } from '@nestjs/mapped-types';
import { CreateCollectionSuitDto } from './create-collection_suit.dto';

export class UpdateCollectionSuitDto extends PartialType(CreateCollectionSuitDto) {}
