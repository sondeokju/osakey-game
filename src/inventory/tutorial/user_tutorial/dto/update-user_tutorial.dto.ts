import { PartialType } from '@nestjs/mapped-types';
import { CreateUserTutorialDto } from './create-user_tutorial.dto';

export class UpdateUserTutorialDto extends PartialType(CreateUserTutorialDto) {}
