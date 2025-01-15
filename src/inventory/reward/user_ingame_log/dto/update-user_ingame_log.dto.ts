import { PartialType } from '@nestjs/mapped-types';
import { CreateUserIngameLogDto } from './create-user_ingame_log.dto';

export class UpdateUserIngameLogDto extends PartialType(CreateUserIngameLogDto) {}
