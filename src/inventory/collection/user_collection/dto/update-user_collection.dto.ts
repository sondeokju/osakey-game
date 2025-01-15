import { PartialType } from '@nestjs/mapped-types';
import { CreateUserCollectionDto } from './create-user_collection.dto';

export class UpdateUserCollectionDto extends PartialType(CreateUserCollectionDto) {}
